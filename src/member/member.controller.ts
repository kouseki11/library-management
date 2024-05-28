import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  create(@Body() data: CreateMemberDto) {
    return this.memberService.create(data);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.findOne(id);
  }
}