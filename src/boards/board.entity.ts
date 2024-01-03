import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status-enum';
import { User } from '../auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // 여기서 선언해줘야 유저 엔티티에서 board 참조 가능
  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
