import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'

@Entity('list')
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.lists, {eager: true})
    user: UserEntity

    @DeleteDateColumn()
    deletedAt: Date
}