import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateListDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export default UpdateListDto;