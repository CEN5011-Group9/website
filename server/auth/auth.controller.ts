import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../public.decorator';
import { DatabaseService } from '../database/database.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly $authService: AuthService,
    private readonly $databaseService: DatabaseService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() request: any): Promise<any> {
    return this.$authService.login(request.user);
  }

  /**
   * Controller for User Registartion
   * @param email         User email
   * @param password      User password not hashed
   * @returns HttpResponse Promise, will include
   *          Success -> valid JWT token
   *          Fail, beacuse user exists -> response.body will include error {E_ERR, D_ERR, B_ERR} from UniqueError
   */
  @Public()
  @Post('register')
  public async register(
    @Body('userInput') userInput: User,
    @Body('password') password: string
  ): Promise<any> {
    return this.$authService.register(userInput, password);
  }

  @Public()
  @Get('is-admin')
  public async isAdmin(@Request() request: any): Promise<boolean> {
    const user = await this.$databaseService.user.findFirst({
      where: {
        email: request.user.username
      }
    })

    return user?.role == UserRole.Admin
  }
}
