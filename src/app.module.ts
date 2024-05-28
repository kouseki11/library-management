import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { BorrowModule } from './borrow/borrow.module';
import { SeedModule } from './seeders/seed.module';

@Module({
  imports: [BookModule, MemberModule, BorrowModule, SeedModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
