import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PermissionTypeEnum, ResourceTypeEnum } from 'src/common/enums';
import { PermissionGuard } from 'src/common/guards';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './services';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned all projects.',
  })
  public async getProjects(): Promise<ProjectEntity[]> {
    return this.projectService.getProjects();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned a project by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found project.',
  })
  public async getProjectById(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.getProjectById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PROJECT))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Project updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found project.',
  })
  @ApiBody({ type: UpdateProjectDto })
  public async updateProject(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.updateProjectById(new Types.ObjectId(id), updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PROJECT))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found project.',
  })
  public async deleteProjectById(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.deleteProjectById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PROJECT))
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Project was successfully created.',
  })
  @ApiBody({ type: CreateProjectDto })
  public async createProject(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.createProject(createProjectDto);
  }
}
