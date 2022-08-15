import { Player } from 'src/players/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  suspensionTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((_type) => Player, (player) => player.account, { eager: true })
  players: Player[];
}
