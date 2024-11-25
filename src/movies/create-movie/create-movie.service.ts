/** @format */

import { ConflictException, Injectable } from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';
import { CreateMovieDto } from './create-movie.dto';

@Injectable()
export class CreateMovieService {
  constructor(private movieService: MovieService) {}
  async createMovie(body: CreateMovieDto): Promise<IMovie> {
    try {
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

      return await this.movieService.create(body);
    } catch (e) {
      throw e;
    }
  }
}
