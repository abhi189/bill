import { BaseEntity } from './../../shared';
import { DiscountValue } from './discount-values/discount-value.model';

export const enum DiscountType {
    'BILLING_MONTHS',
    'HISTORICAL_SPEND',
    'EQUIPMENT',
    'SHARED_SAVINGS'
}

export const enum EquipmentInstalled {
    'ANY',
    'LED',
    'KE2_FREEZER',
    'KE2_COOLER',
    'ENERFIT'
}

export class Discount implements BaseEntity {
    constructor(
        public id?: number,
        public discountName?: string,
        public discountType?: DiscountType,
        public associatedEMO?: string,
        public description?: string,
        public equipmentInstalledRequired?: boolean,
        public equipmentInstalled?: EquipmentInstalled,
        public equipmentInstalledMonthsRequired?: boolean,
        public equipmentInstalledMonths?: number,
        public accrueDiscountSavings?: boolean,
        public startDate?: any,
        public endDate?: any,
        public discountValues?: DiscountValue[],
        public minimunValue?: number,
        public maximunValue?: number,
        public hasSolutions?: boolean,
        public sharedSavings?: boolean,
        public sharedSavingsYears?: number,
        public sharedSavingsPercentage?: number,
        public lateCharges?: boolean,
        public lateChargesDays?: number,
        public lateChargesPercentage?: number
    ) {
        this.equipmentInstalledRequired = false;
        this.equipmentInstalledMonthsRequired = false;
        this.accrueDiscountSavings = false;
        this.discountValues = new Array<DiscountValue>();
    }
}
