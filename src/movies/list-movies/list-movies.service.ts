/** @format */

import { Injectable } from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';

@Injectable()
export class ListMoviesService {
  constructor(private movieService: MovieService) {}
  async listMovies(): Promise<IMovie[] | []> {
    try {
      return await this.movieService.find();
    } catch (e) {
      throw e;
    }
  }
}
