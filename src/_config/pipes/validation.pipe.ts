import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ENVIRONMENT } from '../constants/environment.constant';
import { DICTIONARY } from '../constants/dictionary.constant';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error, value: _value } = this.schema.validate(value, {
      abortEarly: false,
      context: {
        type: metadata.type,
        metatype: metadata.metatype,
        data: metadata.data,
      },
    });

    let mapError: any;
    if (error) {
      if (ENVIRONMENT.ENVIRONMENT_NAME === DICTIONARY.production) {
        mapError = error.details.map((iterator) => {
          return iterator.message;
        });
      } else {
        mapError = error;
      }
      throw new BadRequestException(mapError);
    }

    return _value;
  }
}
