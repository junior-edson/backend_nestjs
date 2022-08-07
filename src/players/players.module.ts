import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayersRepository } from './repository/implementations/postgres-players.repository';

@Module({
  controllers: [PlayersController],
  providers: [
    PlayersService,
    { provide: 'IPlayersRepository', useClass: PlayersRepository },
  ],
  exports: [PlayersService],
  imports: [AuthModule],
})
export class PlayersModule {}
