import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFrameworkDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  @ApiProperty({ example: 'WebdriverIO Cucumber Boilerplate' })
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty({
    example:
      'Cucumber Boilerplate\n\nStep patterns from Cucumber Boilerplate project to run WebdriverIO (v7) tests with Cucumber and brings true BDD to JavaScript.\n\nhttps://github.com/webdriverio/cucumber-boilerplate',
  })
  @IsOptional()
  public readonly description?: string;
}
