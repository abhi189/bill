import { BaseEntity } from './../../shared';

export const enum ServiceTag {
    'BILLING',
    'INVENTORY'
}

export class JobDescription implements BaseEntity {
    constructor(
        public id?: number,
        public callbackURL?: string,
        public cron?: string,
        public tag?: ServiceTag,
        public httpMethod?: string
    ) {}
}
