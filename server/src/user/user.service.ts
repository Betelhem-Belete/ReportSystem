import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Chat } from 'src/chat/entities/chat.entity';
import * as bcrypt from 'bcrypt';
import { Message } from 'src/message/entities/message.entity';
import { WebsocketGateway } from 'src/socket/websocket.gateway';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,

    private jwt: JwtService,
    private socketGateway: WebsocketGateway,
  ) {}

  async Create_custumer(createUserDto: CreateUserDto) {
    const check = await this.userRepository.findOne({
      where: { phone: createUserDto.phone },
    });
    if(check?.isBlocked){
      return
    }
    try {
     
      let user:any;
      //////////////
      if (!check) {
        const data = await this.userRepository.create({
          phone: createUserDto.phone,
          state: createUserDto.state,
        });
         user = await this.userRepository.save(data);
        const chat_req = await this.chatRepository.create({
          sender : user.id,
          title: createUserDto.message,
          createdAt: new Date()
        })
        const res = await this.chatRepository.save(chat_req)
        console.log(res, "respons_non exsiting")
        ////emit here
        this.socketGateway.emitNotificationToGroups(res, 'agent')
        return res
      }
      /////////////////
      let checks: any;
     checks = check.id
     if(check.state === 'in_session'){
      const query = `select receiverId, senderId
                    from chat 
                    where  (senderId=${checks} and isComplit= false)`
      const data = await this.chatRepository.query(query)
      console.log('in sesion', data)// worked
      //////////
      const { message} = createUserDto;
      const query2 = `INSERT INTO message (message, senderId, receiverId, createdAt) VALUES (?, ?, ?, ?)`;
      const createdAt = new Date()
      const data2 = await this.messageRepository.query(query2, [message, data[0].senderId, data[0].receiverId, createdAt]);
      console.log(data2, "kdjfk");
      return data2;    

     }else if(check.state === 'resolved'){
       const q1 = `update user 
                    set state = 'open'
                    where id = ${checks}`
       const user = await this.chatRepository.query(q1)
       const chat_req = await this.chatRepository.create({
        sender : user.id,
        title: createUserDto.message,
        createdAt: new Date()
      })
      const res = await this.chatRepository.save(chat_req)
      console.log(res, "respons_for exsting")
      ////emit
      return res
     }
     else if(check.state ==='open'){
      return ('your request is under review')
     }
    } 
    catch (error) {
      console.log(error);
    }
  }

  async create_employee_login(createUserDto:CreateUserDto) : Promise<{ access_token: string; id: number }>{
    try {
      const user = await this.userRepository.findOne({
        where: { phone: createUserDto.phone },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      const match = await bcrypt.compare(createUserDto.password, user.password);
      if (!match) {
        throw new UnauthorizedException();
      }
      const payload = { id: user.id, role: user.Role, phone : user.phone };
  
      return {
        access_token: await this.jwt.signAsync(payload),
        id: user.id
      };
    } catch (error) {
    console.log(error, 'someting went wrong');
    
    }
  }

  async create_employee_signup(createUserDto:CreateUserDto) {
    try {
      const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          phone: createUserDto.phone,
          password: hash,
          Role: createUserDto.Role,
        },
      ])
      .execute();
      console.log('user created');

    } catch (error) {}
  }



  async completeRequest(createUserDto:CreateUserDto) {
    try {
        const query = `UPDATE chat
                       SET isComplit = true
                       WHERE id = ?`;
        const query2 = `UPDATE user
                       SET state = 'resolved'
                       WHERE id = ?`;

        const result = await this.chatRepository.query(query, [createUserDto.chatId]);
        const result2 = await this.userRepository.query(query2, [createUserDto.userId]);

        console.log('Completed', result, result2);
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
    return
}

async blockUser(createUserDto:CreateUserDto) {
    try {
        const query = `UPDATE user
                       SET isBlocked = true
                       WHERE id = ?`;
        const result = await this.userRepository.query(query, [createUserDto.userId]);
        console.log('Blocked');
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
    return
  }


  remove(id: number) {
    try {
    } catch (error) {}
    return `This action removes a #${id} user`;
  }
}
