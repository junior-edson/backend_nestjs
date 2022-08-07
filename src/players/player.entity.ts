import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlayerStatus } from './player-status.enum';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  @Index()
  accountId: string;

  @Column({
    nullable: true,
  })
  @Index()
  skillsId: string;

  @Column({
    nullable: true,
  })
  @Index()
  classId: string;

  @Column({
    nullable: true,
  })
  @Index()
  squadId: string;

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
}
