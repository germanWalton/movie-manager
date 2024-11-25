/** @format */

import { Injectable } from '@nestjs/common';
import { MovieService } from '../_model/movies.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncMoviesService {
  constructor(
    private movieService: MovieService,
    private readonly httpService: HttpService,
  ) {}
  @Cron('*/30 * * * *')
  async syncMovies() {
    try {
      /*  De los dos enfoques posibles  se opto para que en cada sincronización se reemplacen todas las peliculas
          de la DB por las actualizadas que devuelve swapi. El otro enfoque posible es hacer una comparación entre 
          la DB y lo que trae la api, actualizar las que ya existen y dejar las peliculas creadas.Pero desde mi punto
          de vista eso generaria inconsistencias entre las peliculas ya que habria diferencias entre las peliculas que
          devuelve la api y las almacenadas.*/
      console.log('...Updating movies');
      const lastMovies = this.httpService.get(
        `${process.env.SWAPI_BASE}/films`,
      );
      const response = await lastValueFrom(lastMovies);
      await this.movieService.deleteMany({});
      await this.movieService.insertMany(response.data.results);
    } catch (e) {
      throw e;
    }
  }
}
