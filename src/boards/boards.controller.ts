import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status-enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

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

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
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
