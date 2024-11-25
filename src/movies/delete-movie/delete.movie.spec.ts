import { Test, TestingModule } from '@nestjs/testing';
import { DeleteMovieService } from './delete-movie.service';
import { MovieService } from '../_model/movies.service';
import { NotFoundException } from '@nestjs/common';

describe('DeleteMovieService', () => {
  let deleteMovieService: DeleteMovieService;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMovieService,
        {
          provide: MovieService,
          useValue: {
            findById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteMovieService = module.get<DeleteMovieService>(DeleteMovieService);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should throw a NotFoundException if movie is not found', async () => {
    const movieId = '674383b94292221d44d17e05';
    jest.spyOn(movieService, 'findById').mockResolvedValue(null);

    await expect(deleteMovieService.deleteMovie(movieId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(deleteMovieService.deleteMovie(movieId)).rejects.toThrow(
      'Movie not found',
    );
  });

  it('should delete the movie if it exists', async () => {
    const movieId = '674383b94292221d44d17e06';
    const movie = { id: movieId, title: 'Movie Example', episode_id: 123 };
    jest.spyOn(movieService, 'findById').mockResolvedValue(movie);
    jest.spyOn(movieService, 'deleteById').mockResolvedValue(movie);

    const result = await deleteMovieService.deleteMovie(movieId);

    expect(result).toEqual(movie);
    expect(movieService.deleteById).toHaveBeenCalledWith(movieId);
  });
});
