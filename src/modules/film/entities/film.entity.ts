import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { GenreEntity } from './genre.entity'
import { CountryEntity } from './country.entity'
import { ListEntity } from '../../list/entities/list.entity'

@Entity('film')
export class FilmEntity {

    @PrimaryColumn()
    id: number

    @Column({nullable: true, default: null})
    imdb_id: string

    @Column()
    original_language: string

    @Column()
    original_title: string

    @Column()
    title: string

    @Column({nullable: true, default: null})
    overview: string

    @Column({type: 'numeric'})
    popularity: number

    @Column({nullable: true, default: null})
    poster_path: string

    @Column()
    release_date: Date

    @Column({type: 'numeric'})
    vote_average: number

    @Column()
    vote_count: number

    @ManyToMany(() => CountryEntity, {nullable: true})
    @JoinTable({name: 'films_countries'})
    countries: CountryEntity[]

    @ManyToMany(() => GenreEntity, {nullable: true})
    @JoinTable({name: 'films_genres'})
    genres: GenreEntity[]

    @ManyToMany(() => ListEntity)
    @JoinTable({name: 'lists_films'})
    lists: ListEntity[]

    @Column({default: false})
    is_updated: boolean
}