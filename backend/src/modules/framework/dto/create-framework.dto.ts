import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { setValidationMessage } from 'src/common/helpers';

export class CreateFrameworkDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Framework name should be more than'),
  })
  @MaxLength(80, {
    message: setValidationMessage('Framework name should be less than'),
  })
  @ApiProperty({ example: 'WebdriverIO Cucumber Boilerplate' })
  public readonly name: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Framework description should be more than'),
  })
  @MaxLength(300, {
    message: setValidationMessage('Framework description should be less than'),
  })
  @ApiProperty({
    example:
      'Cucumber Boilerplate\n\nStep patterns from Cucumber Boilerplate project to run WebdriverIO (v7) tests with Cucumber and brings true BDD to JavaScript.\n\nhttps://github.com/webdriverio/cucumber-boilerplate',
  })
  @IsOptional()
  public readonly description?: string;
}
