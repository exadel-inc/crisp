import {
  Controller,
  Get,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  ValidationPipe,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { FrameworkService } from './services';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFrameworkDto, UpdateFrameworkDto } from './dto';
import { FrameworkEntity } from './framework.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { PermissionGuard } from 'src/common/guards';
import { PermissionTypeEnum, ResourceTypeEnum } from 'src/common/enums';

@ApiTags('frameworks')
@Controller('frameworks')
export class FrameworkController {
  constructor(private readonly frameworkService: FrameworkService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned all frameworks.',
  })
  public async getFrameworks(): Promise<FrameworkEntity[]> {
    return this.frameworkService.getFrameworks();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned a framework by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found framework.',
  })
  public async getFrameworkById(@Param('id') id: string): Promise<FrameworkEntity> {
    return this.frameworkService.getFrameworkById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.FRAMEWORK))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Framework updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found framework.',
  })
  @ApiBody({ type: UpdateFrameworkDto })
  public async updateFramework(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateFrameworkDto: UpdateFrameworkDto,
  ): Promise<FrameworkEntity> {
    return this.frameworkService.updateFrameworkById(new Types.ObjectId(id), updateFrameworkDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.FRAMEWORK))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Framework deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found framework.',
  })
  public async deleteFrameworkById(@Param('id') id: string): Promise<FrameworkEntity> {
    return this.frameworkService.deleteFrameworkById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.FRAMEWORK))
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Framework was successfully created.',
  })
  @ApiBody({ type: CreateFrameworkDto })
  public async createFramework(
    @Body(new ValidationPipe()) createFrameworkDto: CreateFrameworkDto,
  ): Promise<FrameworkEntity> {
    return this.frameworkService.createFramework(createFrameworkDto);
  }
}
