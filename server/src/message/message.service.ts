import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,

  ){}
  async create(createMessageDto: CreateMessageDto) {
    console.log(createMessageDto, "dtoooo");
    
    try {
        // Extract the properties from createMessageDto
        const { message, sender, receiver } = createMessageDto;
        const query = `INSERT INTO message (message, senderId, receiverId, createdAt) VALUES (?, ?, ?, ?)`;
        const createdAt = new Date()
        const data = await this.messageRepository.query(query, [message, sender, receiver, createdAt]);
        console.log(data, "kdjfk");

        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw error for further handling
    }
}



async fetchAll(createMessageDto: CreateMessageDto) {
  console.log(createMessageDto, 'msg');
  try {
      const query = `
          SELECT
              message.id AS message_id,
              message.message AS message_message,
              message.senderId AS senderId,
              message.receiverId AS receiverId
          FROM
              message
          WHERE
              (message.senderId = ? AND message.receiverId = ?)
          OR
              (message.senderId = ? AND message.receiverId = ?)
      `;
      
      const data = await this.messageRepository.query(query, [
          createMessageDto.sender,
          createMessageDto.receiver,
          createMessageDto.receiver,
          createMessageDto.sender
      ]);

      const messages = data.map(message => ({
          message: message.message_message,
          sender: message.senderId,
          receiver: message.receiverId,
          id: message.message_id,
      }));

      if (!data) return [];
      console.log(messages, 'sent mssg');
      return messages;
  } catch (error) {
      console.log(error);
      return [];
  }
}


  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
