import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }

  // @Get('/')
  // getAllBoards() {
  //   return this.boardsService.getAllBoards();
  // }
  //
  // @Get('/:id')
  // // @Get('/:id/:name')
  // // param 여러개일 때는 getBoardById(@Param('id') id: string, @Param('name') name: string) {}
  // // param 여러개일 때는 getBoardById(@Param() params: string[]) {}
  // // DTO 만드는기준???
  // getBoardById(@Param('id') id: string) {
  //   return this.boardsService.getBoardById(id);
  // }
  //
  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto) {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  //
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string) {
  //   return this.boardsService.deleteBoard(id);
  // }
  //
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
