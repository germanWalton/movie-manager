/** @format */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movies.schema';
import { MovieService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieSubModule {}
