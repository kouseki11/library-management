import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BorrowService } from './borrow.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post('borrow')
  borrowBook(@Body() data: BorrowBookDto) {
    return this.borrowService.borrowBook(data);
  }

  @Post('return')
  returnBook(@Body() data: ReturnBookDto) {
    return this.borrowService.returnBook(data);
  }
}