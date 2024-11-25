import { Test, TestingModule } from '@nestjs/testing';
import { GetByEpisodeIdService } from './get-by-episode-id.service';
import { MovieService } from '../_model/movies.service';
import { IMovie } from '../_model/movies.interface';

describe('GetByEpisodeIdService', () => {
  let getByEpisodeIdService: GetByEpisodeIdService;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByEpisodeIdService,
        {
          provide: MovieService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    getByEpisodeIdService = module.get<GetByEpisodeIdService>(
      GetByEpisodeIdService,
    );
    movieService = module.get<MovieService>(MovieService);
  });

  it('should return an array of movies if movies exist with the provided episode_id', async () => {
    const episodeId = 123;
    const movies = [
      { id: '1', title: 'Movie 1', episode_id: episodeId },
      { id: '2', title: 'Movie 2', episode_id: episodeId },
    ];
    jest.spyOn(movieService, 'find').mockResolvedValue(movies);
    const result = await getByEpisodeIdService.getByEpisodeId(episodeId);

    expect(result).toEqual(movies);
    expect(movieService.find).toHaveBeenCalledWith({ episode_id: episodeId });
  });

  it('should return an empty array if no movies are found for the provided episode_id', async () => {
    const episodeId = 999;
    const movies: IMovie[] = [];
    jest.spyOn(movieService, 'find').mockResolvedValue(movies);
    const result = await getByEpisodeIdService.getByEpisodeId(episodeId);

    expect(result).toEqual([]);
    expect(movieService.find).toHaveBeenCalledWith({ episode_id: episodeId });
  });

  it('should throw an error if find fails', async () => {
    const episodeId = 123;
    jest
      .spyOn(movieService, 'find')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      getByEpisodeIdService.getByEpisodeId(episodeId),
    ).rejects.toThrow('Database error');
  });
});
