import { EntityTarget } from "typeorm";
import { Source } from "../entity";
import { BaseService } from "./base";

export class SourceService extends BaseService {
  constructor() {
    super(Source);
  }
}
