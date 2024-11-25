/** @format */
import * as Joi from 'joi';

export const loginJoi = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});
