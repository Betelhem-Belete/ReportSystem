import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const data = await this.chatRepository
    .createQueryBuilder("chat")
    .where("(chat.sender = :sender AND chat.receiver = :receiver)", { sender: createChatDto.sender, receiver: createChatDto.receiver })
    .orWhere("(chat.sender = :receiver AND chat.receiver = :sender)", { sender: createChatDto.receiver, receiver: createChatDto.sender })
    .getOne();

    console.log(data, 'chat thing');
    
    return data
    }

   ////////agent
   async getChat(createChatDto: CreateChatDto) {
    try {
      const query = `
        SELECT chat.*, user.phone AS senderPhone
        FROM chat
        INNER JOIN user ON chat.senderId = user.id
        WHERE chat.receiverId = ${createChatDto.receiver}
      `;
      const results = await this.chatRepository.query(query);
      console.log(results, 'result');
      return results;
    } catch(error) {
      console.log(error);
      throw error; // Re-throw error for further handling
    }
  }
  

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
