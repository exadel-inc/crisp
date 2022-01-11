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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePageDto, UpdatePageDto } from './dto';
import { PageEntity } from './page.entity';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { PageService } from './services';

@ApiTags('pages')
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned all pages.',
  })
  public async getPages(): Promise<PageEntity[]> {
    return this.pageService.getPages();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned a page by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found page.',
  })
  public async getPageById(@Param('id') id: string): Promise<PageEntity> {
    return this.pageService.getPageById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Page updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found page.',
  })
  @ApiBody({ type: UpdatePageDto })
  public async updatePage(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePageDto: UpdatePageDto,
  ): Promise<PageEntity> {
    return this.pageService.updatePageById(new Types.ObjectId(id), updatePageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Page deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found page.',
  })
  public async deletePageById(@Param('id') id: string): Promise<PageEntity> {
    return this.pageService.deletePageById(new Types.ObjectId(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Page was successfully created.',
  })
  @ApiBody({ type: CreatePageDto })
  public async createPage(
    @Body(new ValidationPipe()) createPageDto: CreatePageDto,
  ): Promise<PageEntity> {
    return this.pageService.createPage(createPageDto);
  }
}
