import { BaseEntity } from './../../shared';

export class BudderflyInvoiceDiscount implements BaseEntity {
    constructor(
        public id?: number,
        public discountPct?: number,
        public discountSaving?: number,
        public relatedBudderflyInvoiceId?: number
    ) {}
}
