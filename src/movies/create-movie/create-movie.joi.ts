/** @format */
import * as Joi from 'joi';

export const createMovieJoi = Joi.object({
  title: Joi.string().required(),
  episode_id: Joi.number().required(),
  opening_crawl: Joi.string().required(),
  director: Joi.string().required(),
  producer: Joi.string().required(),
  release_date: Joi.string().required(),
  characters: Joi.array().items(Joi.string()),
  planets: Joi.array().items(Joi.string()),
  starships: Joi.array().items(Joi.string()),
  vehicles: Joi.array().items(Joi.string()),
  species: Joi.array().items(Joi.string()),
  url: Joi.string().required(),
  created: Joi.string().optional(),
  edited: Joi.string().optional(),
});
