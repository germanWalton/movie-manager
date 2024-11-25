import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  created?: string;
  edited?: string;
  @ApiProperty({ description: 'Movie title' })
  title: string;
  @ApiProperty({ description: 'The episode number of this film.' })
  episode_id: number;
  @ApiProperty({
    description: 'The opening paragraphs at the beginning of this film.',
  })
  opening_crawl: string;
  @ApiProperty({ description: 'The name of the director of this film.' })
  director: string;
  @ApiProperty({
    description:
      'The name(s) of the producer(s) of this film. Comma separated.',
  })
  producer: string;
  @ApiProperty({
    description:
      'The ISO 8601 date format of film release at original creator country.',
  })
  release_date: string;
  @ApiProperty({
    description: 'An array of characters resource URLs that are in this film.',
  })
  characters: string[];
  @ApiProperty({
    description: 'An array of planets resource URLs that are in this film.',
  })
  planets: string[];
  @ApiProperty({
    description: 'An array of starships resource URLs that are in this film.',
  })
  starships: string[];
  @ApiProperty({
    description: 'An array of vehicles resource URLs that are in this film.',
  })
  vehicles: string[];
  @ApiProperty({
    description: 'An array of species  resource URLs that are in this film.',
  })
  species: string[];
  @ApiProperty({ description: 'the hypermedia URL of this resource.' })
  url: string;
}
