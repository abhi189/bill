import { BaseEntity } from './../../shared';

export const enum BillingCycleStatus {
    'OPEN',
    'CLOSED'
}

export class BillingCycle implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dueDate?: any,
        public statementDate?: any,
        public notes?: string,
        public message?: string,
        public status?: BillingCycleStatus,
        public budderflyInvoices?: BaseEntity[]
    ) {}
}
