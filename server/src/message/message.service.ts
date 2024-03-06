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
    try {
        // Extract the properties from createMessageDto
        const { message, senderId, receiverId } = createMessageDto;
        // Create a new message entity
        let send :any
        let rec :any
        send = senderId
        rec = receiverId
        const newMessage = this.messageRepository.create({
          message,
          sender: send,
          receiver: rec, 
            createdAt: new Date(),
        });

        // Save the message entity
        const savedMessage = await this.messageRepository.save(newMessage);

        console.log(savedMessage, "kdjfk");

        return savedMessage;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw error for further handling
    }
}


  async fetchAll(createMessageDto: CreateMessageDto) {
    try {
      const data = await this.messageRepository
      .createQueryBuilder('message')
      .select([
        'message.id',
        'message.message',
        'message.senderId',
        'message.receiverId',
      ])
      .where("(message.sender = :sender AND message.receiver = :receiver)", { sender: createMessageDto.senderId, receiver: createMessageDto.receiverId })
      .orWhere("(message.sender = :receiver AND message.receiver = :sender)", { sender: createMessageDto.receiverId, receiver: createMessageDto.senderId })
      .getRawMany();
      const messages = data.map(message => ({
        message: message.message_message,
        sender: message.senderId,
        receiver: message.receiverId,
        id: message.message_id,
      }));
     
      if(!data) return []
      return messages;
     } catch (error) {
      console.log(error)
      return
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
