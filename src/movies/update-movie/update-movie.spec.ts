import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMovieService } from './update-movie.service';
import { MovieService } from '../_model/movies.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('UpdateMovieService', () => {
  let updateMovieService: UpdateMovieService;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMovieService,
        {
          provide: MovieService,
          useValue: {
            findById: jest.fn(),
            find: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateMovieService = module.get<UpdateMovieService>(UpdateMovieService);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should throw a NotFoundException if the movie does not exist', async () => {
    const param = { id: '1' };
    const body = { title: 'New Title', episode_id: 123 };
    jest.spyOn(movieService, 'findById').mockResolvedValue(null);

    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      NotFoundException,
    );
    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      'Movie not found',
    );
  });

  it('should throw a ConflictException if a movie with the same title exists', async () => {
    const param = { id: '1' };
    const body = { title: 'Existing Title', episode_id: 123 };
    const existingMovie = { id: '1', title: 'Existing Title', episode_id: 123 };
    jest.spyOn(movieService, 'findById').mockResolvedValue(existingMovie);
    jest
      .spyOn(movieService, 'find')
      .mockResolvedValueOnce([existingMovie])
      .mockResolvedValueOnce([]);

    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      ConflictException,
    );
    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      `Movie with title "${body.title}" already exists`,
    );
  });

  it('should throw a ConflictException if a movie with the same episode_id exists', async () => {
    const param = { id: '1' };
    const body = { title: 'New Title', episode_id: 123 };
    const existingMovie = { id: '2', title: 'Another Movie', episode_id: 123 };
    jest.spyOn(movieService, 'findById').mockResolvedValue(existingMovie);
    jest
      .spyOn(movieService, 'find')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([existingMovie]);

    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      ConflictException,
    );
    await expect(updateMovieService.updateMovie(param, body)).rejects.toThrow(
      `Movie with episode ID ${body.episode_id} already exists`,
    );
  });

  it('should update the movie if no conflicts are found', async () => {
    const param = { id: '1' };
    const body = { title: 'Updated Title', episode_id: 124 };
    const movie = { id: '1', title: 'Old Title', episode_id: 123 };
    const updatedMovie = { id: '1', title: 'Updated Title', episode_id: 124 };
    jest.spyOn(movieService, 'findById').mockResolvedValue(movie);
    jest
      .spyOn(movieService, 'find')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    jest.spyOn(movieService, 'updateById').mockResolvedValue(updatedMovie);

    const result = await updateMovieService.updateMovie(param, body);

    expect(result).toEqual(updatedMovie);
    expect(movieService.updateById).toHaveBeenCalledWith(param.id, body);
  });
});
