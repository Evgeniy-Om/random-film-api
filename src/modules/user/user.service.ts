import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import { SearchUserDto } from './dto/search-user.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    create(dto: CreateUserDto) {
        return this.userRepository.save(dto)
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        await this.userRepository.update(userId, {
            currentHashedRefreshToken
        })
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.findById(userId)

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken
        )

        if (isRefreshTokenMatching) {
            return user
        }
    }

    async removeRefreshToken(userId: number) {
        return this.userRepository.update(userId, {
            currentHashedRefreshToken: null
        });
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find({select: ['id', 'fullName', 'email']})
    }

    findById(id: number) {
        return this.userRepository.findOne(id)
    }

    findByCond(cond: LoginUserDto) {
        return this.userRepository.findOne(cond)
    }

    update(id: number, dto: UpdateUserDto) {
        return this.userRepository.update(id, dto)
    }

    async search(dto: SearchUserDto) {
        const qb = this.userRepository.createQueryBuilder('u')

        qb.limit(dto.limit || 0)
        qb.take(dto.take || 10)

        if (dto.fullName) {
            qb.andWhere(`u.fullName ILIKE :fullName`)
        }

        if (dto.email) {
            qb.andWhere(`u.email ILIKE :email`)
        }

        qb.setParameters({
            email: `%${dto.email}%`,
            fullName: `%${dto.fullName}%`,
        })

        const [items, total] = await qb.getManyAndCount()

        return {items, total}
    }
}
