import { BaseEntity } from './../../shared';

export const enum BillingCycleInvoiceActivityAction {
    'INVOICE_GENERATED',
    'INVOICE_EDITED',
    'INVOICE_STATUS_CHANGE',
    'INVOICE_SENT',
    'INVOICE_IMPORTED'
}

export const enum ActivityLevel {
    'ERROR',
    'WARNING',
    'INFO'
}

export class BillingCycleInvoiceActivity implements BaseEntity {
    constructor(
        public id?: number,
        public user?: string,
        public pdfLink?: string,
        public activity?: BillingCycleInvoiceActivityAction,
        public level?: ActivityLevel,
        public message?: string,
        public activityDate?: any,
        public budderflyInvoiceInvoiceNumber?: string,
        public budderflyInvoiceId?: number
    ) {}
}
