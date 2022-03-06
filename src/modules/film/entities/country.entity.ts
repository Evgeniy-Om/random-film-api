import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('country')
export class CountryEntity {

    @PrimaryColumn()
    id: string

    @Column()
    name?: string
}