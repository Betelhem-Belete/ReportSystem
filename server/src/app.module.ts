import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Message } from './message/entities/message.entity';
import { Chat } from './chat/entities/chat.entity';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tati',
    password: '123',
    database: 'reports',
    entities: [User,Message,Chat],
    synchronize: true,
  }), UserModule, ChatModule, MessageModule, ReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
