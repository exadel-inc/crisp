import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGdtYWlsLmNvbSIsImlhdCI6MTY0MDYzMjA3OSwiZXhwIjoxNjQwNzE4NDc5fQ.0zGoox-5lX2YkYBh_indrX6dJBi8i31071pPOJgFOLE',
  })
  public readonly refreshToken: string;
}
