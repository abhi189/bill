import { BaseEntity } from './../../shared';

export class Adjustment implements BaseEntity {
    constructor(public id?: number, public name?: string, public total?: number, public budderflyInvoiceId?: number) {}
}
