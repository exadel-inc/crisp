import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsString()
  @ApiProperty({ example: 'your refresh access token' })
  public readonly refreshToken: string;
}
