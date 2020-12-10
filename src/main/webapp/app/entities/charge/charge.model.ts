import { BaseEntity } from './../../shared';

export class Charge implements BaseEntity {
    constructor(
        public id?: number,
        public chargeId?: string,
        public lifecycle?: string,
        public usageUnit?: string,
        public measurementType?: string,
        public rateComponent?: string,
        public intervalStart?: any,
        public intervalEnd?: any,
        public chargeAmount?: number,
        public chargeAmountCurrency?: string,
        public chargeCurrency?: string,
        public chargeRateCurrency?: string,
        public chargeRatePerUnit?: number,
        public chargeRatePerUnitMultiplier?: number,
        public chargeUnitsUsed?: number,
        public chargeActualName?: string,
        public thirdPartyProvider?: string,
        public thirdPartyAccountNumber?: string,
        public isAdjustmentCharge?: boolean,
        public createDate?: any,
        public invoiceId?: number,
        public meterId?: number,
        public lastModifiedBy?: string,
        public lastModified?: any
    ) {
        this.isAdjustmentCharge = false;
    }
}
