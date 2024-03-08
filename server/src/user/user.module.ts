import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from 'src/message/entities/message.entity';
import { WebsocketGateway } from 'src/socket/websocket.gateway';

@Module({
  imports : [TypeOrmModule.forFeature([User,Chat, Message]),
  JwtModule.register({
    global: true,
    secret: 'jwtConstants.secret',
    signOptions: { expiresIn: '1d' },
}),],
  controllers: [UserController],
  providers: [UserService, WebsocketGateway],
})
export class UserModule {}
