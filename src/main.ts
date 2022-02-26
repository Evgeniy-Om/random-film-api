import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { UserEntity } from './user/entities/user.entity'

async function bootstrap() {
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Backend геренатора фильмов")
        .setDescription("Документация REST API")
        .setVersion("1.0.0")
        .addTag("Om")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api", app, document)

    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT)


}

bootstrap()
