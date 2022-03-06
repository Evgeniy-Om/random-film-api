import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('API геренатора случайных фильмов')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            withCredentials: true,
        },
    };

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api', app, document, customOptions)

    app.use(cookieParser())

    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT)

}

bootstrap()
