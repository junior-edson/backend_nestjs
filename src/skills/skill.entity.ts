import { Player } from 'src/players/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aiming: number;

  @Column()
  agility: number;

  @Column()
  intelligence: number;

  @Column()
  technician: number;

  @Column()
  currentHealth: number;

  @Column()
  totalHealth: number;

  @Column()
  availablePoints: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type) => Player, (player) => player.skill, { eager: false })
  player: Player;
}
