import { Exclude } from 'class-transformer';
import { Account } from 'src/auth/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlayerStatus } from './player-status.enum';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  @Index()
  name: string;

  @Column()
  level: number;

  @Column()
  amountMoney: number;

  @Column()
  avatar: string;

  @Column()
  inventorySize: number;

  @Column({
    nullable: true,
  })
  suspensionTime: Date;

  @Column({ default: PlayerStatus.ACTIVE })
  status: PlayerStatus;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToOne((_type) => Account, (account) => account.players, { eager: false })
  @Exclude({ toPlainOnly: true })
  account: Account;
}
