import { BaseEntity } from './../../shared';

export const enum ChargeCategory {
    'ELECTRIC',
    'OTHER',
    'TAX',
    'EXCLUDED'
}

export class UtilityChargeConfiguration implements BaseEntity {
    constructor(
        public id?: number,
        public priority?: number,
        public serviceType?: string,
        public chargeId?: string,
        public chargeActualName?: string,
        public utilityProvider?: string,
        public chargeCategory?: ChargeCategory
    ) {
        this.chargeId = '*';
        this.chargeActualName = '*';
        this.utilityProvider = '*';
    }
}
