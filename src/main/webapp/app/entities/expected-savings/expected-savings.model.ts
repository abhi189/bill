import { BaseEntity } from './../../shared';

export class ExpectedSavings implements BaseEntity {
    constructor(public id?: number, public customerType?: string, public solution?: string, public savingPercentage?: number) {}
}
