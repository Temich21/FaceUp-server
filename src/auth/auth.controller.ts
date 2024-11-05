import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async singup(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userData = await this.authService.signup(createUserDto)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData)
    }

    @Post('signin')
    async login(
        @Body() signinUserDto: CredentialsDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userData = await this.authService.signin(signinUserDto)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData)
    }

    @Get('logout')
    async logout(
        @Res({ passthrough: true }) res: Response,
    ) {
        res.clearCookie('refreshToken')
    }

    @Get('refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken } = req.cookies
        const userData = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData)
    }
}