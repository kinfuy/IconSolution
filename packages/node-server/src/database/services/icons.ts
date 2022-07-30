
import { EntityTarget } from "typeorm";
import { Icons } from "../entity";
import { BaseService } from "./base";


export class IconService extends BaseService {
  constructor() {
    super(Icons);
  }

}
