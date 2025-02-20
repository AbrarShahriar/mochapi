import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEndpointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}
