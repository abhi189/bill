import { BaseEntity } from './../../shared';

export class StagingCharge implements BaseEntity {
    constructor(
        public id?: number,
        public usageUnit?: string,
        public measurementType?: string,
        public rateComponent?: string,
        public intervalStart?: any,
        public intervalEnd?: any,
        public chargeAmount?: number,
        public chargeCurrency?: string,
        public chargeRatePerUnit?: number,
        public chargeRatePerUnitMultiplier?: number,
        public chargeUnitsUsed?: number,
        public chargeActualName?: string,
        public chargeAmountCurrency?: string,
        public chargeId?: string,
        public chargeRateCurrency?: string,
        public isAdjustmentCharge?: boolean,
        public lifecycle?: string,
        public thirdPartyAccountNumber?: string,
        public thirdPartyProvider?: string,
        public createDate?: any,
        public lastModified?: any,
        public invoiceId?: number,
        public meterLogicalMeterId?: string,
        public meterId?: number
    ) {
        this.isAdjustmentCharge = false;
    }
}
