import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieService } from './create-movie.service';
import { MovieService } from '../_model/movies.service';
import { ConflictException } from '@nestjs/common';
import { CreateMovieDto } from './create-movie.dto';

describe('CreateMovieService', () => {
  let service: CreateMovieService;
  let movieService: MovieService;

  const movieServiceMock = {
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMovieService,
        {
          provide: MovieService,
          useValue: movieServiceMock,
        },
      ],
    }).compile();

    service = module.get<CreateMovieService>(CreateMovieService);
    movieService = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw ConflictException if movie title already exists', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'A New Hope',
      episode_id: 1,
      opening_crawl: 'test',
      director: 'George Lucas',
      producer: 'John Smith',
      release_date: '344 dgd 34',
      characters: ['chubaca', 'Han Solo'],
      planets: ['Marte', 'Saturno'],
      starships: ['Tango01', 'Tango02'],
      vehicles: ['Ferrari', 'Mercedez'],
      species: ['Jedi', 'Wookie'],
      url: 'www.swapi',
    };

    movieServiceMock.find.mockResolvedValueOnce([
      { title: createMovieDto.title },
    ]);
    movieServiceMock.find.mockResolvedValueOnce([]);

    await expect(service.createMovie(createMovieDto)).rejects.toThrowError(
      new ConflictException(
        `Movie with title "${createMovieDto.title}" already exists`,
      ),
    );
  });

  it('should throw ConflictException if movie episode_id already exists', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'A New Hope',
      episode_id: 1,
      opening_crawl: 'test',
      director: 'George Lucas',
      producer: 'John Smith',
      release_date: '344 dgd 34',
      characters: ['chubaca', 'Han Solo'],
      planets: ['Marte', 'Saturno'],
      starships: ['Tango01', 'Tango02'],
      vehicles: ['Ferrari', 'Mercedez'],
      species: ['Jedi', 'Wookie'],
      url: 'www.swapi',
    };

    movieServiceMock.find.mockResolvedValueOnce([]);
    movieServiceMock.find.mockResolvedValueOnce([
      { episode_id: createMovieDto.episode_id },
    ]);

    await expect(service.createMovie(createMovieDto)).rejects.toThrowError(
      new ConflictException(
        `Movie with episode ID ${createMovieDto.episode_id} already exists`,
      ),
    );
  });

  it('should call movieService.create when no conflict exists', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'A New Hope 2',
      episode_id: 8,
      opening_crawl: 'test',
      director: 'George Lucas',
      producer: 'John Smith',
      release_date: '3444545g',
      characters: ['chubaca', 'Han Solo'],
      planets: ['Marte', 'Saturno'],
      starships: ['Tango01', 'Tango02'],
      vehicles: ['Ferrari', 'Mercedez'],
      species: ['Jedi', 'Wookie'],
      url: 'www.swapi',
    };

    movieServiceMock.find.mockResolvedValueOnce([]);
    movieServiceMock.find.mockResolvedValueOnce([]);

    movieServiceMock.create.mockResolvedValueOnce({
      ...createMovieDto,
    });

    const result = await service.createMovie(createMovieDto);

    expect(result).toEqual({
      ...createMovieDto,
    });
    expect(movieServiceMock.create).toHaveBeenCalledWith(createMovieDto);
  });
});
