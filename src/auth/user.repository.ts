import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }

    async findOne(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } })
    }

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }
}
