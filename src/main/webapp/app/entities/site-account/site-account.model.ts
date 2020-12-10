import { BaseEntity } from './../../shared';

export const enum SiteAccountState {
    'WAITING_FOR_INVOICES',
    'AMU_GENERATED',
    'AMU_APPROVED',
    'AMU_REJECTED',
    'INACTIVE',
    'ACTIVE'
}

export const enum SiteAccountType {
    'DISTRIBUTION',
    ' GENERATION',
    ' BOTH'
}

export class SiteAccount implements BaseEntity {
    constructor(
        public id?: number,
        public utilityProvider?: string,
        public accountNumber?: string,
        public rawAccountNumber?: string,
        public billingAccountNumber?: string,
        public rawBillingAccountNumber?: string,
        public meterNumber?: string,
        public customerName?: string,
        public customerCode?: string,
        public invoicesSize?: number,
        public expectedInvoices?: number,
        public state?: SiteAccountState,
        public billingStreet?: string,
        public billingCity?: string,
        public billingState?: string,
        public billingZip?: string,
        public paymentAddressFull?: string,
        public paymentAddressStreet?: string,
        public paymentAddressCity?: string,
        public paymentAddressState?: string,
        public paymentAddressZip?: string,
        public siteCode?: string,
        public customerType?: string,
        public siteStreet?: string,
        public siteCity?: string,
        public siteState?: string,
        public siteZip?: string,
        public sitePostalCode?: string,
        public siteAddress1?: string,
        public siteAddress2?: string,
        public siteLongitude?: number,
        public siteLatitude?: number,
        public takeOverDate?: any,
        public requestedDate?: any,
        public liveDate?: any,
        public createdDate?: any,
        public lastModified?: any,
        public lastModifiedBy?: string,
        public type?: SiteAccountType,
        public budderflyId?: string,
        public invoices?: BaseEntity[],
        public jobHistories?: BaseEntity[],
        public alerts?: BaseEntity[],
        public ames?: BaseEntity[],
        public arrears?: boolean,
        public relatedSiteAccountId?: number,
        public summaryInvoices?: SummaryInvoices,
        public siteId?: number,
        public relatedSiteAccountNumber?: string,
        public autoImport?: boolean,
        public notes?: string
    ) {}
}

export class SummaryInvoices {
    constructor(
        public amountInvoices?: number,
        public lastInvoice?: number,
        public dateInvoice?: any,
        public tariffInvoice?: string,
        public invoicesSize?: number,
        public siteAccountId?: number
    ) {}
}

export class SiteId {
    constructor(public id?: number, public budderflyId?: string) {}
}
