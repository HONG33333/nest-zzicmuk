import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtd/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  // @Get('/:id/:name')
  // param 여러개일 때는 getBoardById(@Param('id') id: string, @Param('name') name: string) {}
  // param 여러개일 때는 getBoardById(@Param() params: string[]) {}
  // DTO 만드는기준???
  getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }
}
