import { PartialType } from '@nestjs/swagger';
import { AddFilmToListDto } from './add-film-to-list.dto';

export class UpdateFilmDto extends PartialType(AddFilmToListDto) {}
