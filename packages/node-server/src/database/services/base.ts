
import { AppDataSource } from "../index";
import type { EntityTarget, FindManyOptions } from "typeorm";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseService {
  entity: EntityTarget<unknown>;
  db = AppDataSource;
  constructor(entity: EntityTarget<unknown>) {
    this.entity = entity;
  }
  
  async save(plainObject?: any) {
    return this.db.manager.save(this.entity, plainObject);

  }
  async find(options?: FindManyOptions<typeof this.entity> | undefined) {
    return this.db.manager.find(this.entity, options);
  }
  async delete(criteria: any) {
    return this.db.manager.delete(this.entity, criteria);
  }
  async update(criteria: any, partialEntity: QueryDeepPartialEntity<unknown>) {
    return this.db.manager.update(this.entity, criteria, partialEntity);
  }
}
