import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieService } from './create-movie/create-movie.service';
import { DeleteMovieService } from './delete-movie/delete-movie.service';
import { GetByEpisodeIdService } from './get-by-episode-id/get-by-episode-id.service';
import { ListMoviesService } from './list-movies/list-movies.service';
import { MoviesController } from './movies.controller';
import { UpdateMovieService } from './update-movie/update-movie.service';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let listMoviesService: ListMoviesService;
  let getByEpisodeIdService: GetByEpisodeIdService;
  let createMovieService: CreateMovieService;
  let updateMovieService: UpdateMovieService;
  let deleteMovieService: DeleteMovieService;

  const mockListMoviesService = {
    listMovies: jest.fn(),
  };
  const mockGetByEpisodeIdService = {
    getByEpisodeId: jest.fn(),
  };
  const mockCreateMovieService = {
    createMovie: jest.fn(),
  };
  const mockUpdateMovieService = {
    updateMovie: jest.fn(),
  };
  const mockDeleteMovieService = {
    deleteMovie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: ListMoviesService, useValue: mockListMoviesService },
        { provide: GetByEpisodeIdService, useValue: mockGetByEpisodeIdService },
        { provide: CreateMovieService, useValue: mockCreateMovieService },
        { provide: UpdateMovieService, useValue: mockUpdateMovieService },
        { provide: DeleteMovieService, useValue: mockDeleteMovieService },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    listMoviesService = module.get<ListMoviesService>(ListMoviesService);
    getByEpisodeIdService = module.get<GetByEpisodeIdService>(
      GetByEpisodeIdService,
    );
    createMovieService = module.get<CreateMovieService>(CreateMovieService);
    updateMovieService = module.get<UpdateMovieService>(UpdateMovieService);
    deleteMovieService = module.get<DeleteMovieService>(DeleteMovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listMovies', () => {
    it('should return an array of movies', async () => {
      const result: Movie[] = [
        {
          title: 'Movie 1',
          episode_id: 1,
          opening_crawl: 'string',
          director: 'string',
          producer: 'string',
          release_date: 'string',
          characters: ['string'],
          planets: ['string'],
          starships: ['string'],
          vehicles: ['string'],
          species: ['string'],
          created: 'string',
          edited: 'string',
          url: 'string',
        },
        {
          title: 'Movie 2',
          episode_id: 1,
          opening_crawl: 'string',
          director: 'string',
          producer: 'string',
          release_date: 'string',
          characters: ['string'],
          planets: ['string'],
          starships: ['string'],
          vehicles: ['string'],
          species: ['string'],
          created: 'string',
          edited: 'string',
          url: 'string',
        },
      ];

      mockListMoviesService.listMovies.mockResolvedValue(result);

      expect(await controller.listMovies()).toEqual(result);
      expect(mockListMoviesService.listMovies).toHaveBeenCalled();
    });
  });

  describe('getByEpisodeId', () => {
    it('should return a movie by episode id', async () => {
      const result: Movie = {
        title: 'string',
        episode_id: 1,
        opening_crawl: 'string',
        director: 'string',
        producer: 'string',
        release_date: 'string',
        characters: ['string'],
        planets: ['string'],
        starships: ['string'],
        vehicles: ['string'],
        species: ['string'],
        created: 'string',
        edited: 'string',
        url: 'string',
      };
      const id = 1;

      mockGetByEpisodeIdService.getByEpisodeId.mockResolvedValue(result);

      expect(await controller.getByEpisodeId(id)).toEqual(result);
      expect(mockGetByEpisodeIdService.getByEpisodeId).toHaveBeenCalledWith(id);
    });

    it('should return an empty array if no movie is found', async () => {
      const result: [] = [];
      const id = 999;

      mockGetByEpisodeIdService.getByEpisodeId.mockResolvedValue(result);

      expect(await controller.getByEpisodeId(id)).toEqual(result);
      expect(mockGetByEpisodeIdService.getByEpisodeId).toHaveBeenCalledWith(id);
    });
  });

  describe('createMovie', () => {
    it('should create a movie successfully', async () => {
      const createMovieDto = {
        title: 'New Movie',
        episode_id: 1,
        opening_crawl: 'string',
        director: 'string',
        producer: 'string',
        release_date: 'string',
        characters: ['string'],
        planets: ['string'],
        starships: ['string'],
        vehicles: ['string'],
        species: ['string'],
        created: 'string',
        edited: 'string',
        url: 'string',
      };
      const result: Movie = {
        title: 'New Movie',
        episode_id: 1,
        opening_crawl: 'string',
        director: 'string',
        producer: 'string',
        release_date: 'string',
        characters: ['string'],
        planets: ['string'],
        starships: ['string'],
        vehicles: ['string'],
        species: ['string'],
        created: 'string',
        edited: 'string',
        url: 'string',
      };

      mockCreateMovieService.createMovie.mockResolvedValue(result);

      expect(await controller.createMovie(createMovieDto)).toEqual(result);
      expect(mockCreateMovieService.createMovie).toHaveBeenCalledWith(
        createMovieDto,
      );
    });
  });

  describe('updateMovie', () => {
    it('should update a movie by id', async () => {
      const updateMovieDto = { title: 'Updated Movie', episode_id: 1 };
      const result: Movie = {
        title: 'Updated Movie',
        episode_id: 1,
        opening_crawl: 'string',
        director: 'string',
        producer: 'string',
        release_date: 'string',
        characters: ['string'],
        planets: ['string'],
        starships: ['string'],
        vehicles: ['string'],
        species: ['string'],
        created: 'string',
        edited: 'string',
        url: 'string',
      };
      const id = '1';

      mockUpdateMovieService.updateMovie.mockResolvedValue(result);

      expect(
        await controller.updateMovie({ id } as any, updateMovieDto),
      ).toEqual(result);
      expect(mockUpdateMovieService.updateMovie).toHaveBeenCalledWith(
        { id } as any,
        updateMovieDto,
      );
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie by id', async () => {
      const result: Movie = {
        title: 'string',
        episode_id: 0,
        opening_crawl: 'string',
        director: 'string',
        producer: 'string',
        release_date: 'string',
        characters: ['string'],
        planets: ['string'],
        starships: ['string'],
        vehicles: ['string'],
        species: ['string'],
        created: 'string',
        edited: 'string',
        url: 'string',
      };
      const id = '1';

      mockDeleteMovieService.deleteMovie.mockResolvedValue(result);

      expect(await controller.deleteMovie(id)).toEqual(result);
      expect(mockDeleteMovieService.deleteMovie).toHaveBeenCalledWith(id);
    });
  });
});
