import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isPublic } from '../auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @isPublic()
  @Post()
 async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await  this.userService.create(createUserDto);
    } catch (err) {
      throw new HttpException(
        `can'n create user`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @isPublic()
  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (err) {
       throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      return await this.userService.findByEmail(email);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (err) {
       throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (err) {
       throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
