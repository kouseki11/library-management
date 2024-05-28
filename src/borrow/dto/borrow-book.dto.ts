import { ApiProperty } from '@nestjs/swagger';

export class BorrowBookDto {
  @ApiProperty()
  memberId: number;

  @ApiProperty()
  bookId: number;
}