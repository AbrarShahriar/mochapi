import { Injectable } from '@nestjs/common';
import { CreateFunctionDto, UpdateFunctionDto } from './dto/functions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Function } from './entities/function.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FunctionsService {
  constructor(
    @InjectRepository(Function)
    private readonly functionRepo: Repository<Function>,
  ) {}

  async create(email: string, createFunctionDto: CreateFunctionDto) {
    const functionFound = await this.functionRepo.findOne({
      where: {
        callSignature: createFunctionDto.callSignature,
      },
    });

    if (functionFound) {
      return {
        success: false,
        message: `A function with the same call signature already exists. Please choose a differant call signature.`,
      };
    }

    await this.functionRepo.insert({
      ...createFunctionDto,
      userEmail: email,
      callSignature: `${email.split('@')[0]}:${createFunctionDto.callSignature}`,
    });
    return {
      success: true,
      message: `Function "${createFunctionDto.name}" has been created. Please wait a few seconds as we deploy it."`,
    };
  }

  async findAll(email: string) {
    const functions = await this.functionRepo.find({
      where: {
        userEmail: email,
      },
    });
    return { success: true, payload: functions };
  }

  async findOne(functionId: string) {
    const functionFound = await this.functionRepo.findOne({
      where: {
        id: functionId,
      },
    });

    if (!functionFound) {
      return { success: false, message: 'No function found.' };
    }

    return {
      success: true,
      payload: functionFound,
    };
  }

  async update(email: string, updateFunctionDto: UpdateFunctionDto) {
    const updatedFunction = await this.functionRepo.update(
      { id: updateFunctionDto.id, userEmail: email },
      {
        ...updateFunctionDto,
      },
    );

    return {
      success: true,
      message:
        'Function updated. Wait a few seconds before making any request to the endpoint.',
      payload: updatedFunction.raw[0],
    };
  }

  remove(id: number) {
    return `This action removes a #${id} function`;
  }
}
