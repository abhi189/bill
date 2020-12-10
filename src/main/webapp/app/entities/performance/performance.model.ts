import { BaseEntity } from './../../shared';

export const enum Month {
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
}

export const enum UsageType {
    'KW',
    'KWH',
    'DAY',
    'FLAT',
    'CHARGE',
    'USD',
    'CAD',
    'CCF'
}

export class Performance implements BaseEntity {
    constructor(
        public id?: number,
        public month?: Month,
        public usage?: number,
        public usageType?: UsageType,
        public actual?: number,
        public budderflyInvoiceId?: number,
        public installDate?: any,
        public lastInvoice?: any
    ) {}
}
