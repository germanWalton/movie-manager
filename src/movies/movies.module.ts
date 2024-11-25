/** @format */

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieSubModule } from './_model/movies.module';
import { CreateMovieService } from './create-movie/create-movie.service';
import { DeleteMovieService } from './delete-movie/delete-movie.service';
import { GetByEpisodeIdService } from './get-by-episode-id/get-by-episode-id.service';
import { ListMoviesService } from './list-movies/list-movies.service';
import { MoviesController } from './movies.controller';
import { SyncMoviesService } from './sync-movies/sync-movies.service';
import { UpdateMovieService } from './update-movie/update-movie.service';

@Module({
  imports: [MovieSubModule, HttpModule, ScheduleModule.forRoot()],
  providers: [
    ListMoviesService,
    GetByEpisodeIdService,
    CreateMovieService,
    UpdateMovieService,
    DeleteMovieService,
    SyncMoviesService,
  ],
  controllers: [MoviesController],
  exports: [],
})
export class MovieModule {}
