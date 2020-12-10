import { BaseEntity } from './../../shared';

export class BudderflyInvoiceValidation implements BaseEntity {
    constructor(
        public id?: number,
        public testName?: string,
        public description?: string,
        public config?: any,
        public enabled?: boolean,
        public order?: number,
        public endpoint?: string,
        public updateInvoiceStatus?: boolean,
        public budderflyInvoiceValidationResults?: BaseEntity[]
    ) {
        this.enabled = false;
        this.updateInvoiceStatus = false;
    }
}
