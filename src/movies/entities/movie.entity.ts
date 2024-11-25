import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty({ description: 'Movie title' })
  title: string;
  @ApiProperty({ description: 'Movie episode id' })
  episode_id: number;
  @ApiProperty({ description: 'Movie opening_crawl' })
  opening_crawl: string;
  @ApiProperty({ description: 'Movie director' })
  director: string;
  @ApiProperty({ description: 'Movie producer' })
  producer: string;
  @ApiProperty({ description: 'Movie release date' })
  release_date: string;
  @ApiProperty({ description: 'Movie characters' })
  characters: string[];
  @ApiProperty({ description: 'Movie planets' })
  planets: string[];
  @ApiProperty({ description: 'Movie starships' })
  starships: string[];
  @ApiProperty({ description: 'Movie vehicles' })
  vehicles: string[];
  @ApiProperty({ description: 'Movie species' })
  species: string[];
  @ApiProperty({ description: 'Movie created date' })
  created: string;
  @ApiProperty({ description: 'Movie edited date' })
  edited: string;
  @ApiProperty({ description: 'The hypermedia URL of this resource' })
  url: string;
}
