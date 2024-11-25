/** @format */

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';
import { UpdateMovieDto, UpdateMovieParamDto } from './update-movie.dto';

@Injectable()
export class UpdateMovieService {
  constructor(private movieService: MovieService) {}
  async updateMovie(
    param: UpdateMovieParamDto,
    body: UpdateMovieDto,
  ): Promise<IMovie> {
    try {
      const movie: IMovie | null = await this.movieService.findById(param.id);
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }
      const [existingTitle, existingEpisodeId] = await Promise.all([
        this.movieService.find({ title: body.title }),
        this.movieService.find({ episode_id: body.episode_id }),
      ]);

      if (existingTitle.length > 0) {
        throw new ConflictException(
          `Movie with title "${body.title}" already exists`,
        );
      }

      if (existingEpisodeId.length > 0) {
        throw new ConflictException(
          `Movie with episode ID ${body.episode_id} already exists`,
        );
      }
      return await this.movieService.updateById(param.id, body);
    } catch (e) {
      throw e;
    }
  }
}
