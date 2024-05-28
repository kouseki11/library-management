import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookDto {
  @ApiProperty()
  memberId: number;

  @ApiProperty()
  bookId: number;
}