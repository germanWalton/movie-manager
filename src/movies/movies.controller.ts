import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UsePipes,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { HttpStatusInterceptor } from '../interceptors/http-status.interceptor';
import { ValidationPipe } from '../_config/pipes/validation.pipe';
import { StandardResponseInterceptor } from '../interceptors/standard-response.interceptor';
import { ExceptionFilterAllInterceptor } from '../interceptors/exception-filter-all.interceptor';
import { ListMoviesService } from './list-movies/list-movies.service';
import { Roles } from '../auth/decorators/auth.roles.decorator';
import { RolesGuard } from '../auth/guards/auth.role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { GetByEpisodeIdService } from './get-by-episode-id/get-by-episode-id.service';
import { getByEpisodeIdJoi } from './get-by-episode-id/get-by-episode-id.joi';
import { createMovieJoi } from './create-movie/create-movie.joi';
import { CreateMovieService } from './create-movie/create-movie.service';
import { CreateMovieDto } from './create-movie/create-movie.dto';
import { IMovie } from './_model/movies.interface';
import {
  UpdateMovieDto,
  UpdateMovieParamDto,
} from './update-movie/update-movie.dto';
import {
  updateMovieJoi,
  updateMovieJoiParam,
} from './update-movie/update-movie.joi';
import { UpdateMovieService } from './update-movie/update-movie.service';
import { DeleteMovieService } from './delete-movie/delete-movie.service';
import { deleteMovieJoi } from './delete-movie/delete-movie.joi';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@Controller('movies')
@UseInterceptors(
  HttpStatusInterceptor,
  StandardResponseInterceptor,
  ExceptionFilterAllInterceptor,
)
export class MoviesController {
  constructor(
    private readonly listMoviesService: ListMoviesService,
    private readonly getByEpisodeIdService: GetByEpisodeIdService,
    private readonly createMovieService: CreateMovieService,
    private readonly updateMovieService: UpdateMovieService,
    private readonly deleteMovieService: DeleteMovieService,
  ) {}

  @Get('/list-movies')
  @ApiOperation({ summary: 'List all movies' })
  @ApiResponse({
    status: 200,
    description: 'List of movies',
    type: [Movie],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception.',
  })
  public async listMovies(): Promise<IMovie[] | []> {
    return await this.listMoviesService.listMovies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe(getByEpisodeIdJoi))
  @Get('/get-by-episode-id/:id')
  @ApiOperation({ summary: 'Get movie by episode id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID del episodio', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Response',
    type: Movie,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception.',
  })
  public async getByEpisodeId(@Param('id') id: number): Promise<IMovie | []> {
    return await this.getByEpisodeIdService.getByEpisodeId(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe(createMovieJoi))
  @Post('/create-movie')
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: 201,
    description: 'Correctly created movie',
    type: Movie,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict exception',
  })
  public async createMovie(@Body() body: CreateMovieDto): Promise<IMovie> {
    return await this.createMovieService.createMovie(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/update-movie/:id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Movie id', type: String })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({
    status: 200,
    description: 'Movie updated succesfully',
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found ',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict exception ',
  })
  public async updateMovie(
    @Param(new ValidationPipe(updateMovieJoiParam)) param: UpdateMovieParamDto,
    @Body(new ValidationPipe(updateMovieJoi)) body: UpdateMovieDto,
  ): Promise<IMovie> {
    return await this.updateMovieService.updateMovie(param, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe(deleteMovieJoi))
  @Delete('/delete-movie/:id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID from the movie to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Movie deleted succesfully',
    type: Movie,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  public async deleteMovie(@Param('id') id: string): Promise<IMovie> {
    return await this.deleteMovieService.deleteMovie(id);
  }
}
