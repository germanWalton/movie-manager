/** @format */
import * as Joi from 'joi';

export const updateMovieJoi = Joi.object({
  title: Joi.string().optional(),
  episode_id: Joi.number().optional(),
  opening_crawl: Joi.string().optional(),
  director: Joi.string().optional(),
  producer: Joi.string().optional(),
  release_date: Joi.string().optional(),
  characters: Joi.array().items(Joi.string()),
  planets: Joi.array().items(Joi.string()),
  starships: Joi.array().items(Joi.string()),
  vehicles: Joi.array().items(Joi.string()),
  species: Joi.array().items(Joi.string()),
  url: Joi.string().optional(),
});

export const updateMovieJoiParam = Joi.object({
  id: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required(),
});
