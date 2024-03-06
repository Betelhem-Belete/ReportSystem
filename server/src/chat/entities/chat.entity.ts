import { User } from "src/user/entities/user.entity";
import { Entity,Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'chat'})
export class Chat {

   @PrimaryGeneratedColumn()
   id : bigint;

   @Column()
   resolvedAt : Date

   @Column()
   createdAt : Date;

   @Column()
   title : string;

   @Column()
   isComplit : boolean;

   @ManyToOne(() => User, user => user.chatSender)
   sender: User;

   @ManyToOne(() => User, user => user.chatReceiver)
   receiver: User;    
}