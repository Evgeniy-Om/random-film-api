import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class GenreEntity {

    @PrimaryColumn()
    id: number

    @Column()
    name?: string
}