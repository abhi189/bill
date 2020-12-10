import { BaseEntity } from './../../shared';

export class Tax implements BaseEntity {
    constructor(
        public id?: number,
        public city?: string,
        public state?: string,
        public country?: string,
        public zip?: string,
        public cityTax?: number,
        public cityTaxName?: string,
        public countyTax?: number,
        public countyTaxName?: string,
        public otherTax?: number,
        public otherTaxName?: string,
        public vadidFrom?: any,
        public validTo?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public stateTax?: number,
        public stateTaxName?: string,
        public stateExemptAmount?: number
    ) {}
}
