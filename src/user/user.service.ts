/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUser } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUser) {
    console.log(userId, dto);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: dto,
    });

    user.hash = null;
    return user;
  }
}
