import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('genre')
export class GenreEntity {

    @PrimaryColumn()
    id: number

    @Column()
    name?: string
}