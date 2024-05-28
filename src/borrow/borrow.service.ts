import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BorrowService {
    constructor(private prisma: PrismaService) { }

    async borrowBook(data: BorrowBookDto) {
        const member = await this.prisma.member.findUnique({
            where: { id: data.memberId },
            include: { borrows: { where: { returnDate: null } } },
        });

        if (!member) {
            throw new BadRequestException('Member not found');
        }

        if (member.punishmentEnd && member.punishmentEnd > new Date()) {
            throw new BadRequestException('Member is in punishment period');
        }

        if (member.borrows.some((borrow) => borrow.bookId === data.bookId)) {
            throw new BadRequestException('Member already borrowed this book');
        }

        if (member.borrows.length >= 2) {
            throw new BadRequestException('Member cannot borrow more than 2 books');
        }

        const book = await this.prisma.book.findUnique({
            where: { id: data.bookId },
        });

        if (!book || book.stock < 1) {
            throw new BadRequestException('Book not available');
        }

        await this.prisma.book.update({
            where: { id: data.bookId },
            data: { stock: { decrement: 1 } },
        });

        return this.prisma.borrow.create({
            data: {
                memberId: data.memberId,
                bookId: data.bookId,
            },
        });
    }

    async returnBook(data: ReturnBookDto) {
        const borrow = await this.prisma.borrow.findFirst({
            where: {
                memberId: data.memberId,
                bookId: data.bookId,
                returnDate: null,
            },
        });

        if (!borrow) {
            throw new BadRequestException('No matching borrow record found');
        }

        const returnDate = new Date();
        let penalty = false;

        if ((returnDate.getTime() - new Date(borrow.borrowDate).getTime()) / (1000 * 60 * 60 * 24) > 7) {
            penalty = true;
            await this.prisma.member.update({
                where: { id: data.memberId },
                data: { punishmentEnd: new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000) },
            });
        }

        await this.prisma.book.update({
            where: { id: data.bookId },
            data: { stock: { increment: 1 } },
        });

        return this.prisma.borrow.update({
            where: { id: borrow.id },
            data: {
                returnDate,
                penalty,
            },
        });
    }
}