import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // eager true로 설정하면 user를 가져올 때 board도 같이 가져온다.
  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
