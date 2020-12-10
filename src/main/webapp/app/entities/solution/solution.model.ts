import { BaseEntity } from './../../shared';

export class Solution implements BaseEntity {
    constructor(public id?: number, public name?: string, public budderflyInvoiceId?: number) {}
}
