import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Repository } from 'typeorm';
import { UserStatus } from 'src/user/dto/create-user.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  async New_req(createReportDto: CreateReportDto) {
    try {
      const query = `
        SELECT user.phone as phone,
               chat.title as chatTitle,
               user.state as userState,
               chat.id as chatId
        FROM user
        LEFT JOIN chat ON user.id = chat.senderId
        WHERE user.Role = 'user'
          AND user.state = 'open'
          AND chat.isComplit = false
      `;
      const results = await this.userRepository.query(query);
      
      return results;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw error for further handling
    }  }
  /////////////////
  async All_req(createReportDto: CreateReportDto) {
    try {
      const query = `
        SELECT user.phone as phone,
               chat.title as chatTitle,
               user.state as userState,
               user.id as userId
        FROM user
        LEFT JOIN chat ON user.id = chat.senderId
        WHERE user.Role = 'user'
          AND chat.isComplit = false
      `;
      const results = await this.userRepository.query(query);
      
      return results;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw error for further handling
    }
  }
  //////////////////
  async Completed_req(createReportDto: CreateReportDto) {
    try {
      const query = `
        SELECT user.phone as phone,
               chat.title as chatTitle,
               user.state as userState,
               user.id as userId
        FROM user
        LEFT JOIN chat ON user.id = chat.senderId
        WHERE user.Role = 'user'
          AND user.state = 'resolved'
          AND chat.isComplit = false
      `;
      const results = await this.userRepository.query(query);
      
      return results;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw error for further handling
    }  
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  async update( createReportDto: CreateReportDto) {
    const query  =`update user
                    where user.phone = ${createReportDto.phone}
                    set user.state = 'in_session'`
    const q2 = `update chat
                where chat.id = ${createReportDto.ChatId}
                set isComplit = false and
                receiver = ${createReportDto.userId}`

    const data = await this.userRepository.query(query)
    console.log(data, "updated")
    // emit hear
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
