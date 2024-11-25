import { Test, TestingModule } from '@nestjs/testing';
import { ListMoviesService } from './list-movies.service';
import { MovieService } from '../_model/movies.service';

describe('ListMoviesService', () => {
  let listMoviesService: ListMoviesService;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListMoviesService,
        {
          provide: MovieService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    listMoviesService = module.get<ListMoviesService>(ListMoviesService);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should return a list of movies if there are movies in the database', async () => {
    // Arrange
    const movies = [
      { id: '1', title: 'Movie 1', episode_id: 123 },
      { id: '2', title: 'Movie 2', episode_id: 456 },
    ];
    jest.spyOn(movieService, 'find').mockResolvedValue(movies);

    const result = await listMoviesService.listMovies();

    expect(result).toEqual(movies);
    expect(movieService.find).toHaveBeenCalled();
  });

  it('should return an empty array if no movies are found', async () => {
    const movies: [] = [];
    jest.spyOn(movieService, 'find').mockResolvedValue(movies);

    const result = await listMoviesService.listMovies();

    expect(result).toEqual([]);
    expect(movieService.find).toHaveBeenCalled();
  });

  it('should throw an error if the MovieService.find fails', async () => {
    jest
      .spyOn(movieService, 'find')
      .mockRejectedValue(new Error('Database error'));

    await expect(listMoviesService.listMovies()).rejects.toThrow(
      'Database error',
    );
  });
});
