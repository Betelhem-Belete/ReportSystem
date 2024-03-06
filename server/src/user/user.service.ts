import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Chat } from 'src/chat/entities/chat.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,

    private jwt: JwtService,
  ) {}

  async Create_custumer(createUserDto: CreateUserDto) {
    try {
      const check = await this.userRepository.findOne({
        where: { phone: createUserDto.phone },
      });
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
        return res
      }
      let checks: any;
     checks = check.id
      const chat_req = await this.chatRepository.create({
        sender : checks,
        title: createUserDto.message,
        createdAt: new Date()
      })
      
      const res = await this.chatRepository.save(chat_req)
      console.log(res, "respons_for exsting")
      return res
    
     
    } catch (error) {
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
        id: user.id,
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

  findOne(id: number) {
    try {
    } catch (error) {}
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
    } catch (error) {}
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    try {
    } catch (error) {}
    return `This action removes a #${id} user`;
  }
}
