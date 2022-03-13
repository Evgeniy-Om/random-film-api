export class SearchFilmDto {
    country?: string
    genre?: string
    yearFrom: Date
    yearTo: Date
    ratingFrom: number
    ratingTo: number
    take?: number
    skip?: number
}
