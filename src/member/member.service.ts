import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMemberDto) {
    return this.prisma.member.create({ data });
  }

  async findAll() {
    return this.prisma.member.findMany({
      include: { borrows: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.member.findUnique({
      where: { id },
      include: { borrows: true },
    });
  }
}
