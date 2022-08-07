import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Account } from './account.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IAccountsRepository } from './repository/account.repository';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAccountsRepository')
    private readonly accountsRepository: IAccountsRepository,
    private jwtService: JwtService,
  ) {}

  async getAccountById(id: string): Promise<Account | null> {
    const account: Account = await this.accountsRepository.getAccountById(id);

    if (!account) {
      throw new NotFoundException(`Account ID "${id}" not found`);
    }

    return account;
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account: Account = await this.accountsRepository.getAccountByEmail(
      email,
    );

    if (!account) {
      throw new NotFoundException(`Account email "${email}" not found`);
    }

    return account;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Account> {
    const { email } = authCredentialsDto;
    const account: Account = await this.accountsRepository.getAccountByEmail(
      email,
    );

    if (!account) {
      return this.accountsRepository.createAccount(authCredentialsDto);
    } else {
      throw new ConflictException(`Account email "${email}" already exists`);
    }
  }

  async signIn(
    signInCredentials: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signInCredentials;
    const account: Account = await this.accountsRepository.getAccountByEmail(
      email,
    );

    if (account && (await bcrypt.compare(password, account.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
