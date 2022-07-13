import { EntityTarget, FindManyOptions } from 'typeorm';
import { AppDataSource } from '../index';
export class BaseService {
  private entity: EntityTarget<unknown>;
  constructor(entity: EntityTarget<unknown>) {
    this.entity = entity;
  }
  async create() {}
  async find(options?: FindManyOptions<typeof this.entity> | undefined) {
    return AppDataSource.manager.find(this.entity, options);
  }
  async delete() {}
  async update() {}
}
