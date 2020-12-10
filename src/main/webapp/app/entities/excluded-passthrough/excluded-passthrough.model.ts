import { BaseEntity } from './../../shared';

export class ExcludedPassthrough implements BaseEntity {
    constructor(public id?: number, public serviceType?: string, public siteAccountId?: number, public siteAccount?: BaseEntity) {}
}
