import { EntityTarget } from "typeorm";
import { User } from "../entity";
import { BaseService } from "./base";

export class UserService extends BaseService {
  constructor() {
    super(User);
  }
}
