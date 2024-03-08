import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { User } from 'src/user/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketGateway } from 'src/socket/websocket.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([User,Chat])],
  controllers: [ReportsController,],
  providers: [ReportsService,WebsocketGateway],
})
export class ReportsModule {}
