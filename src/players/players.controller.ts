import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Account } from 'src/auth/account.entity';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayerFilterDto } from './dto/get-player-filter.dto';
import { UpdatePlayerStatusDto } from './dto/update-player-status.dto';
import { Player } from './player.entity';
import { PlayersService } from './players.service';

@Controller('players')
@UseGuards(AuthGuard())
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/:id')
  getPlayerById(
    @Param('id') id: string,
    @GetAccount() account: Account,
  ): Promise<Player> {
    return this.playersService.getPlayerById(id, account);
  }

  @Post()
  createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @GetAccount() account: Account,
  ): Promise<Player> {
    return this.playersService.createPlayer(createPlayerDto, account);
  }

  @Get()
  getPlayers(
    @Query() filterDto: GetPlayerFilterDto,
    @GetAccount() account: Account,
  ): Promise<Player[]> {
    return this.playersService.getPlayers(filterDto, account);
  }

  @Delete('/:id')
  deletePlayer(
    @Param('id') id: string,
    @GetAccount() account: Account,
  ): Promise<void> {
    return this.playersService.deletePlayer(id, account);
  }

  @Patch('/:id/status')
  updatePlayerStatus(
    @Param('id') id: string,
    @Body() updatePlayerStatusDto: UpdatePlayerStatusDto,
    @GetAccount() account: Account,
  ): Promise<Player> {
    const { status } = updatePlayerStatusDto;
    return this.playersService.updatePlayerStatus(id, status, account);
  }
}
