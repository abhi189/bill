export class DiscountCharge {
    constructor(
        public id?: number,
        public name?: String,
        public tier?: String,
        public usageAmount?: number,
        public usageType?: UsageType,
        public rate?: number,
        public total?: number,
        public invoiceSection?: String,
        public chargeId?: String,
        public chargeActualName?: String,
        public usage?: number,
        public month?: String,
        public rateComponent?: String,
        public discountId?: number
    ) {}

    equals(discountChargeToCompare: DiscountCharge): boolean {
        return (
            this.name === discountChargeToCompare.name &&
            this.tier === discountChargeToCompare.tier &&
            this.usageAmount === discountChargeToCompare.usageAmount &&
            this.usageType === discountChargeToCompare.usageType &&
            this.rate === discountChargeToCompare.rate &&
            this.total === discountChargeToCompare.total &&
            this.invoiceSection === discountChargeToCompare.invoiceSection &&
            this.chargeId === discountChargeToCompare.chargeId &&
            this.chargeActualName === discountChargeToCompare.chargeActualName &&
            this.usage === discountChargeToCompare.usage &&
            this.month === discountChargeToCompare.month &&
            this.rateComponent === discountChargeToCompare.rateComponent &&
            this.discountId === discountChargeToCompare.discountId
        );
    }

    isPersisted(): boolean {
        return this.id != null && this.id > 0;
    }
}

export enum UsageType {
    KW = 'KW',
    KWH = 'KWH',
    DAY = 'DAY',
    FLAT = 'FLAT',
    CHARGE = 'CHARGE',
    USD = 'USD',
    CAD = 'CAD',
    CCF = 'CCF'
}

export enum InvoiceSection {
    ACCOUNT_CHARGES = 'ACCOUNT_CHARGES',
    ELECTRICITY_CHARGES = 'ELECTRICITY_CHARGES',
    OTHER_CHARGES = 'OTHER_CHARGES',
    TAXES_AND_FEES = 'TAXES_AND_FEES',
    GENERATION_CHARGES = 'GENERATION_CHARGES',
    DELIVERY_CHARGES = 'DELIVERY_CHARGES',
    TAX_CHARGES = 'TAX_CHARGES',
    GAS_CHARGES = 'GAS_CHARGES'
}

export enum Month {
    JAN = 'JAN',
    FEB = 'FEB',
    MAR = 'MAR',
    APR = 'APR',
    MAY = 'MAY',
    JUN = 'JUN',
    JUL = 'JUL',
    AUG = 'AUG',
    SEP = 'SEP',
    OCT = 'OCT',
    NOV = 'NOV',
    DEC = 'DEC'
}
