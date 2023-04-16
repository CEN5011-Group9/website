import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { PrismaClient, User, UserRole } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../public.decorator';
import { DatabaseService } from '../database/database.service';
import { UserDetailDTO } from 'server/models/UserDetailDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly $authService: AuthService,
    private readonly $databaseService: DatabaseService
  ) {}

  @Public()
  //@UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() request: UserDetailDTO): Promise<any> {
    console.log("The control entered the login flow in the auth.controller.ts class and the request is "+request )
    return this.$authService.login(request);
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
    @Body() userInput: UserDetailDTO
  ): Promise<any> {
    console.log("Entered the user controller for registration call")
    return this.$authService.register(userInput);
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
