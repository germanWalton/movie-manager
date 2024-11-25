/** @format */

import { Injectable } from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';

@Injectable()
export class GetByEpisodeIdService {
  constructor(private movieService: MovieService) {}
  async getByEpisodeId(id: number): Promise<IMovie | []> {
    try {
      return await this.movieService.find({ episode_id: id });
    } catch (e) {
      throw e;
    }
  }
}
