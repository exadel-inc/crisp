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
import { ElementService } from './services';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateElementDto, UpdateElementDto } from './dto';
import { ElementEntity } from './element.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

@ApiTags('elements')
@Controller('elements')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Returned all elements.',
  })
  public async getElements(): Promise<ElementEntity[]> {
    return this.elementService.getElements();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 200,
    description: 'Returned a element by id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found element.',
  })
  public async getElementById(@Param('id') id: string): Promise<ElementEntity> {
    return this.elementService.getElementById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Element updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found element.',
  })
  @ApiBody({ type: UpdateElementDto })
  public async updateElement(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateElementDto: UpdateElementDto,
  ): Promise<ElementEntity> {
    return this.elementService.updateElementById(new Types.ObjectId(id), updateElementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Element deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found element.',
  })
  public async deleteElementById(@Param('id') id: string): Promise<ElementEntity> {
    return this.elementService.deleteElementById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 201,
    description: 'Element was successfully created.',
  })
  @ApiBody({ type: CreateElementDto })
  public async createElement(
    @Body(new ValidationPipe()) createElementDto: CreateElementDto,
  ): Promise<ElementEntity> {
    return this.elementService.createElement(createElementDto);
  }
}