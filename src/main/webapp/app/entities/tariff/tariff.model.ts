import { BaseEntity } from './../../shared';

export const enum TariffStatus {
    'NEW',
    'ACTIVE',
    'PENDING_UPDATE'
}

export enum InvoiceSectionEnum {
    'ACCOUNT_CHARGES' = 'Account',
    'ELECTRICITY_CHARGES' = 'Electrical',
    'TAX_CHARGES' = 'Taxes',
    'GAS_CHARGES' = 'Gas',
    'OTHER_CHARGES' = 'Other'
}

export class Tariff implements BaseEntity {
    constructor(
        public id?: number,
        public utilityProviderKey?: string,
        public tariffName?: string,
        public status?: TariffStatus,
        public tariffYears?: TariffYear[],
        public rates?: Rate[],
        public externalId?: number,
        public providerId?: number,
        public providerName?: string,
        public autoUpdate?: boolean
    ) {}
}

export class TariffYear implements BaseEntity {
    constructor(public id?: number, public year?: number, public tariffId?: number, public rates?: Rate[], public ratesToRemove?: Rate[]) {}
}

export class Rate implements BaseEntity {
    constructor(
        public id?: number,
        public verified?: boolean,
        public chargeId?: string,
        public chargeDescription?: string,
        public rateComponent?: string,
        public usageUnit?: string,
        public rateType?: string,
        public amount?: number,
        public ratePerUnit?: number,
        public rateApplyPercentages?: Rate[],
        public months?: number[],
        public billingMonthJan?: number,
        public billingMonthFeb?: number,
        public billingMonthMar?: number,
        public billingMonthApr?: number,
        public billingMonthMay?: number,
        public billingMonthJun?: number,
        public billingMonthJul?: number,
        public billingMonthAug?: number,
        public billingMonthSep?: number,
        public billingMonthOct?: number,
        public billingMonthNov?: number,
        public billingMonthDec?: number,
        public invoiceSection?: string,
        public updateDate?: any,
        public optional?: boolean,
        public year?: number,
        public tariffId?: number,
        public confirmed?: boolean,
        public rateTypeParsed?: string,
        public tierNumber?: number
    ) {
        this.verified = false;
        this.optional = false;
        this.confirmed = false;
    }
}

export class Provider implements BaseEntity {
    constructor(public id?: number, public name?: string) {}
}

export class UtilityTariff implements BaseEntity {
    constructor(public id?: number, public utilityProviderKey?: string, public tariffs?: Tariff[]) {}
}
