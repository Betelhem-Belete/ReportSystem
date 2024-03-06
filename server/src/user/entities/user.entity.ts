import { Chat } from "src/chat/entities/chat.entity";
import { Message } from "src/message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Define enum for user status
enum UserStatus {
  RESOLVED = 'resolved',
  IN_SESSION = 'in_session',
  OPEN = 'open'}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    phone: string;

    @Column({nullable:true})
    password: string;
    
    @Column({ default: 'user' })
    Role: string;

    @Column({default:false})
    isBlocked : boolean;

    // Modify state column to use enum
    @Column({ default: UserStatus.OPEN })
    state: UserStatus;

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];

    @OneToMany(() => Chat, chat => chat.sender)
    chatSender: Chat[];

    @OneToMany(() => Chat, chat => chat.receiver)
    chatReceiver: Chat[];
}
