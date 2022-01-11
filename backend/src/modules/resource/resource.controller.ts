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
import { ResourceService } from './services';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResourceDto, UpdateResourceDto } from './dto';
import { ResourceEntity } from './resource.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { RoleGuard } from 'src/common/guards';
import { RoleTypeEnum } from 'src/common/enums';

@ApiTags('resources')
@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned all resources.',
  })
  public async getResources(): Promise<ResourceEntity[]> {
    return this.resourceService.getResources();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned a resource by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found resource.',
  })
  public async getResourceById(@Param('id') id: string): Promise<ResourceEntity> {
    return this.resourceService.getResourceById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(RoleGuard(RoleTypeEnum.ADMIN))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Resource updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found resource.',
  })
  @ApiBody({ type: UpdateResourceDto })
  public async updateResource(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceEntity> {
    return this.resourceService.updateResourceById(new Types.ObjectId(id), updateResourceDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(RoleTypeEnum.ADMIN))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Resource deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found resource.',
  })
  public async deleteResourceById(@Param('id') id: string): Promise<ResourceEntity> {
    return this.resourceService.deleteResourceById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RoleGuard(RoleTypeEnum.ADMIN))
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Resource was successfully created.',
  })
  @ApiBody({ type: CreateResourceDto })
  public async createResource(
    @Body(new ValidationPipe()) createResourceDto: CreateResourceDto,
  ): Promise<ResourceEntity> {
    return this.resourceService.createResource(createResourceDto);
  }
}
