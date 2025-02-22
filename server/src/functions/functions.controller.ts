import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { CreateFunctionDto, UpdateFunctionDto } from './dto/functions.dto';
import { User } from '@clerk/backend';

@Controller('functions')
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @Post('create')
  create(@Body() createFunctionDto: CreateFunctionDto, @Req() req) {
    const user: User = req.user;

    return this.functionsService.create(
      user.emailAddresses[0].emailAddress,
      createFunctionDto,
    );
  }

  @Get('all')
  findAll(@Req() req) {
    const user: User = req.user;
    return this.functionsService.findAll(user.emailAddresses[0].emailAddress);
  }

  @Get('one/:functionId')
  findOne(@Param('functionId') functionId: string) {
    return this.functionsService.findOne(functionId);
  }

  @Patch('update')
  update(@Body() updateFunctionDto: UpdateFunctionDto, @Req() req) {
    const user: User = req.user;
    return this.functionsService.update(
      user.emailAddresses[0].emailAddress,
      updateFunctionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionsService.remove(+id);
  }
}
