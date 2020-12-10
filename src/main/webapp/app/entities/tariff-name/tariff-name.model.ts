import { BaseEntity } from './../../shared';

export class TariffName implements BaseEntity {
    constructor(public id?: number, public utilityCode?: string, public name?: string) {}
}
