import { BaseEntity } from './../../shared';

export const enum ResponsibleParty {
    'FINANCE'
}

export class MissingInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public budderflyId?: string,
        public utilityProvider?: string,
        public accountNumber?: string,
        public takeOverDate?: any,
        public startDate?: any,
        public endDate?: any,
        public gapFixed?: boolean,
        public uploadedToUrjanet?: boolean,
        public responsible?: ResponsibleParty,
        public noInvoices?: boolean,
        public notes?: string,
        public siteAccountId?: number
    ) {
        this.gapFixed = false;
        this.uploadedToUrjanet = false;
        this.noInvoices = false;
    }
}
