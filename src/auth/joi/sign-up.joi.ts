/** @format */
import * as Joi from 'joi';

export const signUpJoi = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').required(),
});
