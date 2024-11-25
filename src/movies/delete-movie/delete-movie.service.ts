/** @format */

import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';

@Injectable()
export class DeleteMovieService {
  constructor(private movieService: MovieService) {}
  async deleteMovie(id: string): Promise<IMovie> {
    try {
      const movie: IMovie | null = await this.movieService.findById(id);
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }
      return await this.movieService.deleteById(id);
    } catch (e) {
      throw e;
    }
  }
}
