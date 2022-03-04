import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
// import { CommentEntity } from '../../comment/entities/comment.entity'
// import { PostEntity } from '../../post/entities/post.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({example: '12', description: 'ID пользователя'})
    id: number

    @Column()
    @ApiProperty({example: 'Вася Пупкин', description: 'Имя пользователя'})
    fullName: string

    @Column({
        unique: true,
    })
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    email: string

    // @OneToMany(() => CommentEntity, (comment) => comment.user, {
    //   eager: false,
    //   nullable: true,
    // })
    // comments: CommentEntity[];
    //
    // @OneToMany(() => PostEntity, (post) => post.user, {
    //   eager: false,
    //   nullable: true,
    // })
    // posts: PostEntity[];

    @Column({nullable: true})
    password?: string

    @Column({
        nullable: true
    })
    @Exclude()
    currentHashedRefreshToken?: string

    @ApiProperty({example: '2022-03-02T13:14:13.617Z', description: 'Дата создания профиля'})
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    @ApiProperty({example: '2022-03-02T13:14:13.617Z', description: 'Дата последнего обновления профиля'})
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date
}
