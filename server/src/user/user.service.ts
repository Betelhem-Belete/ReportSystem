import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Chat } from 'src/chat/entities/chat.entity';

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
        where:{phone :createUserDto.phone}
      })
      if(check){
  const data = await this.userRepository.create({
        phone: createUserDto.phone
      })
      const user = await this.userRepository.save(data)
      console.log(user, 'user');
      }
    
      
      // return user
  
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
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
