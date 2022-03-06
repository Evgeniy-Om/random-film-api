import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class CountryEntity {

    @PrimaryColumn()
    id: string

    @Column()
    name?: string
}