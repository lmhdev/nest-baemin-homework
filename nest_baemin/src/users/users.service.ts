import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role, users as User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<User> {
    return this.prisma.users.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { user_id: Number(id) },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.prisma.users.update({
      where: { user_id: Number(id) },
      data,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.users.delete({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
