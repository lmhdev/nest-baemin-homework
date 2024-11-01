import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password, name, role } = createUserDto;
    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    return this.createToken(user);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return this.createToken(user);
  }

  private createToken(user: any) {
    const payload = { email: user.email, id: user.user_id };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    };
  }
}
