import { Test, TestingModule } from '@nestjs/testing';
import { SyncMoviesService } from './sync-movies.service';
import { MovieService } from '../_model/movies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('SyncMoviesService', () => {
  let service: SyncMoviesService;
  let movieService: MovieService;
  let httpService: HttpService;

  const headers = new AxiosHeaders({
    'Content-Type': 'application/json',
  });

  const mockMovies: AxiosResponse = {
    data: {
      results: [
        {
          title: 'A New Hope',
          episode_id: 4,
          director: 'George Lucas',
        },
        {
          title: 'The Empire Strikes Back',
          episode_id: 5,
          director: 'Irvin Kershner',
        },
      ],
    },
    status: 200,
    statusText: 'OK',
    headers: headers,
    config: {
      url: `${process.env.SWAPI_BASE}/films`,
      method: 'GET',
      headers: headers,
    } as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncMoviesService,
        {
          provide: MovieService,
          useValue: {
            deleteMany: jest.fn().mockResolvedValue(true),
            insertMany: jest.fn().mockResolvedValue(mockMovies.data.results),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SyncMoviesService>(SyncMoviesService);
    movieService = module.get<MovieService>(MovieService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('syncMovies', () => {
    it('should successfully sync movies from API', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockMovies));

      await service.syncMovies();

      expect(httpService.get).toHaveBeenCalledWith(
        `${process.env.SWAPI_BASE}/films`,
      );

      expect(movieService.deleteMany).toHaveBeenCalledWith({});

      expect(movieService.insertMany).toHaveBeenCalledWith(
        mockMovies.data.results,
      );
    });

    it('should throw error when API call fails', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw new Error('API Error');
      });

      await expect(service.syncMovies()).rejects.toThrow('API Error');

      expect(movieService.deleteMany).not.toHaveBeenCalled();
      expect(movieService.insertMany).not.toHaveBeenCalled();
    });

    it('should throw error when database operations fail', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockMovies));

      jest
        .spyOn(movieService, 'deleteMany')
        .mockRejectedValue(new Error('DB Error'));

      await expect(service.syncMovies()).rejects.toThrow('DB Error');

      expect(movieService.insertMany).not.toHaveBeenCalled();
    });
  });
});
