import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { FilmEntity } from '../../film/entities/film.entity'

@Entity('list')
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.lists, {eager: true})
    user: UserEntity

    @ManyToMany(() => FilmEntity)
    @JoinTable({name: 'lists_films'})
    lists: FilmEntity[]

    @DeleteDateColumn()
    deletedAt: Date
}