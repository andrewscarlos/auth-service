import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    createdUser.password = undefined;
    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error(`Can't find user`);
    }
    return user;
  }
  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        password: false,
        email: true,
        id: true,
        name: true,
      },
    });

    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
      select: {
        password: false,
        email: true,
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error(`Can't find user`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.prisma.user.update({
      where: { id: id.toString() },
      data: updateUserDto,
    });

    if (!userUpdated) {
      throw new Error(`User ${id} not updated`);
    }

    return userUpdated;
  }

  async remove(id: number) {
    const userDeleted = await this.prisma.user.delete({
      where: { id: id.toString() },
    });

    if (!userDeleted) {
      throw new Error(`User ${id} does not deleted`);
    }
    return userDeleted;
  }
}
