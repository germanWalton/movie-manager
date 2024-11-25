import { InternalServerErrorException } from '@nestjs/common';

export class MongooseAdapter {
  constructor(protected schema: any) {
    this.schema = schema;
  }

  public async create(data: any): Promise<any> {
    try {
      const newSchema = new this.schema(data);
      return await newSchema.save();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('error inesperado en [create]', e);
    }
  }

  public async findById(id: string): Promise<any> {
    try {
      return await this.schema.findById(id).exec();
    } catch (e) {
      throw new InternalServerErrorException(
        'error inesperado en [findById]',
        e,
      );
    }
  }

  public async updateById(id: string, data: any): Promise<any> {
    try {
      return await this.schema
        .findByIdAndUpdate(id, data, { returnOriginal: false })
        .exec();
    } catch (e) {
      throw new InternalServerErrorException(
        'error inesperado en [updateById]',
        e,
      );
    }
  }

  public async deleteById(id: string): Promise<any> {
    try {
      return await this.schema.findOneAndDelete({ _id: id });
    } catch (e) {
      throw new InternalServerErrorException(
        'error inesperado en [deleteById]',
        e,
      );
    }
  }

  public async find(condition?: any): Promise<any> {
    try {
      console.log('schema', this.schema, condition);

      return await this.schema.find(condition, { _id: 0 }).lean().exec();
    } catch (e) {
      throw new InternalServerErrorException('error inesperado en [find]', e);
    }
  }

  public async deleteMany(condition: any): Promise<any> {
    try {
      return await this.schema.deleteMany(condition).exec();
    } catch (e) {
      throw new InternalServerErrorException(
        'error inesperado en [deleteMany]',
        e,
      );
    }
  }
  public async insertMany(condition: any): Promise<any> {
    try {
      return await this.schema.insertMany(condition);
    } catch (e) {
      throw new InternalServerErrorException(
        'error inesperado en [insertMany]',
        e,
      );
    }
  }
}
