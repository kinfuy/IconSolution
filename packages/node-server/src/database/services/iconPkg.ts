import { EntityTarget } from 'typeorm';
import { iconPkg } from '../entity';
import { BaseService } from './base';

export class IconPkgService extends BaseService {
  constructor() {
    super(iconPkg);
  }
}
