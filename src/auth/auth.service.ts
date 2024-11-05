import { BadRequestException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt'
import { TokenService } from 'src/auth/token/token.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';

type UserResponse = {
    id: string
    name: string
    email: string
    age: number
}

type AuthUser = {
    accessToken: string
    refreshToken: string
    user: UserResponse
}

@Injectable()
export class AuthService {
    constructor(
        private tokenService: TokenService,
        private userRepository: UserRepository,
    ) { }

    async signup({ name, email, age, password }: CreateUserDto): Promise<AuthUser> {
        const candidate = await this.userRepository.findOne(email)
        if (candidate) {
            throw new Error(`User with this email ${email} already exist`)
        }

        const hashPassword = await hash(password, 3)

        const user = await this.userRepository.saveUser(new User(name, email, age, hashPassword))

        const tokens = this.tokenService.generateTokens({ ...user })

        return { ...tokens, user: { id: user.id, name: user.name, email: user.email, age: user.age } }
    }

    async signin({ email, password }: CredentialsDto): Promise<AuthUser> {
        const user = await this.userRepository.findOne(email)
        if (!user) {
            throw new Error("User with this email doesn't exist")
        }

        const isPassEquals = await compare(password, user.password)
        if (!isPassEquals) {
            throw new Error("Incorrect password")
        }

        const tokens = this.tokenService.generateTokens({ ...user })

        return { ...tokens, user: { id: user.id, name: user.name, email: user.email, age: user.age } }
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new BadRequestException('Refresh token not found')
        }

        const user = this.tokenService.validateRefresh(refreshToken)

        const tokens = this.tokenService.generateTokens({ id: user.id, name: user.name, email: user.email, password: user.password })

        return { ...tokens, user: { id: user.id, name: user.name, email: user.email } }
    }
}