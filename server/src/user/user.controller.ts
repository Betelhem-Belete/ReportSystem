import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('custemer')
  Create_custumer(@Body() createUserDto: CreateUserDto) {
    return this.userService.Create_custumer(createUserDto);
  }

  @Post('login')
  create_employee_login(@Body() createUserDto: CreateUserDto) {
    return this.userService.create_employee_login(createUserDto);
  }

  @Post('signup')
  create_employee_signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create_employee_signup(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('complete')
  completeRequest(@Body() createUserDto: CreateUserDto) {
    return this.userService.completeRequest(createUserDto);

  }

  @Patch('block')
  blockUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.blockUser(createUserDto);

  }
}
