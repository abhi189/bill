import { BaseEntity } from '../../../shared';

export const enum BudderflyInvoiceResultsStatus {
    AUTO_PASS = 'PASS',
    AUTO_FAILED = 'FAILED'
}

export class BudderflyInvoiceValidationResults implements BaseEntity {
    constructor(
        public id?: number,
        public result?: BudderflyInvoiceResultsStatus,
        public message?: string,
        public invoiceId?: string,
        public budderflyInvoiceValidationTestName?: string,
        public budderflyInvoiceValidationId?: number,
        public budderflyInvoiceValidationEndpoint?: string
    ) {}
}

export class BudderflyInvoiceValidation implements BaseEntity {
    budderflyInvoiceValidationResult: BudderflyInvoiceValidationResults;
    running: boolean;
    constructor(
        public id?: number,
        public budderflyInvoiceId?: string,
        public testName?: string,
        public description?: string,
        public config?: string,
        public endpoint?: string,
        public enabled?: boolean,
        public jhiOrder?: number,
        public updateInvoiceStatus?: boolean,
        public budderflyInvoiceValidationResults?: BudderflyInvoiceValidationResults[]
    ) {
        this.budderflyInvoiceValidationResults = [];
    }
}
