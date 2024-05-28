import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  author?: string;

  @ApiProperty()
  stock?: number;
}