import { BaseEntity } from './../../shared';
import { Adjustment } from '../adjustment/adjustment.model';

export class AccountsReceivable implements BaseEntity {
    constructor(
        public id?: number,
        public previousBalance?: number,
        public paymentsReceived?: number,
        public outstandingBalance?: number,
        public budderflyInvoiceId?: number
    ) {}
}
