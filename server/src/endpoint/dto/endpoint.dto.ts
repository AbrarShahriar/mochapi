import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EndpointSchema } from 'src/types/database-types';

export class CreateEndpointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}

export class UpdateEndpointDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  numOfRows?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsArray()
  schema?: EndpointSchema[];

  @IsOptional()
  @IsArray()
  generatedData?: Record<string, unknown>[];
}
