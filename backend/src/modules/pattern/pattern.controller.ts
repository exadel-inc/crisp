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
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatternDto, UpdatePatternDto } from './dto';
import { PatternEntity } from './pattern.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { PatternService } from './services';
import { PermissionGuard } from 'src/common/guards';
import { PermissionTypeEnum, ResourceTypeEnum } from 'src/common/enums';

@ApiTags('patterns')
@Controller('pattern')
export class PatternController {
  constructor(private readonly patternService: PatternService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Returned all patterns.',
  })
  public async getPatterns(): Promise<PatternEntity[]> {
    return this.patternService.getPatterns();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 200,
    description: 'Returned a pattern by id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found pattern.',
  })
  public async getPatternById(@Param('id') id: string): Promise<PatternEntity> {
    return this.patternService.getPatternById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PATTERN))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Pattern updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found pattern.',
  })
  @ApiBody({ type: UpdatePatternDto })
  public async updatePattern(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePatternDto: UpdatePatternDto,
  ): Promise<PatternEntity> {
    return this.patternService.updatePatternById(new Types.ObjectId(id), updatePatternDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PATTERN))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Pattern deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found pattern.',
  })
  public async deletePatternById(@Param('id') id: string): Promise<PatternEntity> {
    return this.patternService.deletePatternById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.PATTERN))
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 201,
    description: 'Pattern was successfully created.',
  })
  @ApiBody({ type: CreatePatternDto })
  public async createPattern(
    @Body(new ValidationPipe()) createPatternDto: CreatePatternDto,
  ): Promise<PatternEntity> {
    return this.patternService.createPattern(createPatternDto);
  }
}
