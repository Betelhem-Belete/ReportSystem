export enum UserStatus {
    RESOLVED = 'resolved',
    IN_SESSION = 'in_session',
    OPEN = 'open'}
export class CreateUserDto {
    phone: string
    password: string
    isBlocked : boolean
    state: UserStatus
    message: string
    Role: string
    chatId:string
    userId:string
}
