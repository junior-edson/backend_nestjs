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
  getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playersService.getPlayerById(id);
  }

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  getPlayers(@Query() filterDto: GetPlayerFilterDto): Promise<Player[]> {
    return this.playersService.getPlayers(filterDto);
  }

  @Delete('/:id')
  deletePlayer(@Param('id') id: string): Promise<void> {
    return this.playersService.deletePlayer(id);
  }

  @Patch('/:id/status')
  updatePlayerStatus(
    @Param('id') id: string,
    @Body() updatePlayerStatusDto: UpdatePlayerStatusDto,
  ): Promise<Player> {
    const { status } = updatePlayerStatusDto;
    return this.playersService.updatePlayerStatus(id, status);
  }
}
