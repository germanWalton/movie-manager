import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieParamDto {
  @ApiProperty({
    description: 'ID from the movie to update',
    type: String,
    required: true,
  })
  id: string;
}

export class UpdateMovieDto {
  @ApiProperty({ description: 'New movie title', required: false })
  title?: string;
  @ApiProperty({
    description: 'The new episode number of this film.',
    required: false,
  })
  episode_id?: number;
  @ApiProperty({
    description: 'The new opening paragraphs at the beginning of this film.',
    required: false,
  })
  opening_crawl?: string;
  @ApiProperty({
    description: 'The new name of the director of this film.',
    required: false,
  })
  director?: string;
  @ApiProperty({
    description:
      'The new name(s) of the producer(s) of this film. Comma separated.',
    required: false,
  })
  producer?: string;
  @ApiProperty({
    description:
      'The new newISO 8601 date format of film release at original creator country.',
    required: false,
  })
  release_date?: string;
  @ApiProperty({
    description:
      'An array of new characters resource URLs that are in this film.',
    required: false,
  })
  characters?: string[];
  @ApiProperty({
    description: 'An array of new planets resource URLs that are in this film.',
    required: false,
  })
  planets?: string[];
  @ApiProperty({
    description:
      'An array of new starships resource URLs that are in this film.',
    required: false,
  })
  starships?: string[];
  @ApiProperty({
    description:
      'An array of new vehicles resource URLs that are in this film.',
    required: false,
  })
  vehicles?: string[];
  @ApiProperty({
    description: 'An array of new species resource URLs that are in this film.',
    required: false,
  })
  species?: string[];
  @ApiProperty({
    description: 'the hypermedia URL of this resource.',
    required: false,
  })
  url?: string;
}
