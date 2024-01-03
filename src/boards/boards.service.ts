import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status-enum';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getAllBoardsByUserId(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    return await query.getMany();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('없어용');
    }

    return found;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({
      id,
      user: {
        id: user.id,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('삭제할 글이 없어용');
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }

  // private boards: Board[] = [];
  //
  // getAllBoards() {
  //   return this.boards;
  // }
  //
  // getBoardById(id: string) {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException('없어용');
  //   }
  //
  //   return found;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //
  //   return board;
  // }
  //
  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const targetBoard = this.getBoardById(id);
  //   targetBoard.status = status;
  //
  //   return targetBoard;
  // }
}
