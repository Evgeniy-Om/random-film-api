import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './modules/user/entities/user.entity'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { ListModule } from './modules/list/list.module'
import { ListEntity } from './modules/list/entities/list.entity'
import { FilmModule } from './modules/film/film.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validationSchema: Joi.object({
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            entities: [UserEntity, ListEntity],
            synchronize: process.env.NODE_ENV === 'development',
        }),
        AuthModule,
        UserModule,
        ListModule,
        FilmModule

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
