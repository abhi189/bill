import { BaseEntity } from './../../shared';

export const enum UsageType {
    'KW',
    'KWH',
    'DAY',
    'FLAT',
    'CHARGE',
    'USD',
    'CAD'
}

export enum InvoiceSection {
    'null' = '',
    ACCOUNT_CHARGES = 'Account',
    ELECTRICITY_CHARGES = 'Electrical',
    TAX_CHARGES = 'Taxes',
    GAS_CHARGES = 'Gas',
    OTHER_CHARGES = 'Other',
    TAXES_AND_FEES = 'Taxes and fees',
    GENERATION_CHARGES = 'Generation charges',
    DELIVERY_CHARGES = 'Delivery charges'
}

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

export class BudderflyCharge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public tier?: string,
        public usageAmount?: number,
        public usageType?: UsageType,
        public rate?: number,
        public total?: number,
        public invoiceSection?: InvoiceSection,
        public discount?: number,
        public discountAmount?: number,
        public chargeId?: string,
        public chargeActualName?: string,
        public usage?: number,
        public month?: Month,
        public rateComponent?: string,
        public budderflyInvoice?: BaseEntity,
        public budderflyInvoiceId?: number,
        public lastModifiedDate?: string,
        public intervalStart?: string,
        public intervalEnd?: string,
        public fullAmount?: number
    ) {}
}
