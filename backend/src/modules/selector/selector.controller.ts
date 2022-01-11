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
import { SelectorService } from './services';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSelectorDto, UpdateSelectorDto } from './dto';
import { SelectorEntity } from './selector.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { PermissionTypeEnum, ResourceTypeEnum, RoleTypeEnum } from '../../common/enums';
import { PermissionGuard, RoleGuard } from '../../common/guards';

@ApiTags('selectors')
@Controller('selectors')
export class SelectorController {
  constructor(private readonly selectorService: SelectorService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned all selectors.',
  })
  public async getSelectors(): Promise<SelectorEntity[]> {
    return this.selectorService.getSelectors();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned a selector by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found selector.',
  })
  public async getSelectorById(@Param('id') id: string): Promise<SelectorEntity> {
    return this.selectorService.getSelectorById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.SELECTOR))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Selector updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found selector.',
  })
  @ApiBody({ type: UpdateSelectorDto })
  public async updateSelector(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateSelectorDto: UpdateSelectorDto,
  ): Promise<SelectorEntity> {
    return this.selectorService.updateSelectorById(new Types.ObjectId(id), updateSelectorDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.SELECTOR))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Selector deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found selector.',
  })
  public async deleteSelectorById(@Param('id') id: string): Promise<SelectorEntity> {
    return this.selectorService.deleteSelectorById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(PermissionGuard(PermissionTypeEnum.WRITE, ResourceTypeEnum.SELECTOR))
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Selector was successfully created.',
  })
  @ApiBody({ type: CreateSelectorDto })
  public async createSelector(
    @Body(new ValidationPipe()) createSelectorDto: CreateSelectorDto,
  ): Promise<SelectorEntity> {
    return this.selectorService.createSelector(createSelectorDto);
  }
}
