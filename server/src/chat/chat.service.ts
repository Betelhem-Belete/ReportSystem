import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
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
