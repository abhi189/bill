import { BaseEntity } from './../../shared';

export class RateChargeMapping implements BaseEntity {
    constructor(
        public id?: number,
        public bdChargeId?: string,
        public bdChargeDescription?: string,
        public bdInvoiceSection?: string,
        public rateName?: string,
        public rateGroupName?: string,
        public chargeClass?: string,
        public seasonName?: string,
        public applicabilityValue?: string,
        public rateMapped?: boolean,
        public ignoreExport?: boolean,
        public forceOptional?: boolean,
        public providerName?: string,
        public providerId?: number,
        public tariffCount?: number
    ) {
        this.rateMapped = false;
        this.ignoreExport = false;
        this.forceOptional = false;
    }
}
