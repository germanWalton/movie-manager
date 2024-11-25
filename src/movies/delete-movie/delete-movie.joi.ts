import * as Joi from 'joi';

export const deleteMovieJoi = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/)
  .required();
