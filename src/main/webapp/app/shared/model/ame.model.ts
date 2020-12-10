import { BaseEntity } from './../../shared';
import { Invoice } from '../../entities/invoice';

export const enum Month {
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
}

export const enum AMEStatus {
    CALCULATING = 'CALCULATING',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export const enum AmeAlgorithm {
    LATEST_RATES = 'LATEST_RATES',
    STANDARD = 'STANDARD',
    LATEST_RATES_V2 = 'LATEST_RATES_V2',
    LATEST_RATES_V3 = 'LATEST_RATES_V3',
    LOWEST_PERIOD = 'LOWEST_PERIOD'
}

export const enum UsageType {
    'KW',
    'KWH'
}

export const enum RateType {
    'FLAT',
    'USAGE',
    'PERCENTAGE',
    'TIER_1',
    'TIER_2',
    'TIER_3',
    'TIER_4',
    'TIER_5',
    'TIER_6',
    'TIER_7'
}

export const enum DateNormalizationRule {
    EXACT_DATE = 'EXACT_DATE',
    START_DATE = 'START_DATE',
    END_DATE = 'END_DATE'
}

export class Ame implements BaseEntity {
    constructor(
        public id?: number,
        public active?: boolean,
        public version?: string,
        public startMonth?: Month,
        public startYear?: number,
        public startDate?: any,
        public algorithm?: AmeAlgorithm,
        public approvedBy?: string,
        public approvedDate?: any,
        public status?: AMEStatus,
        public dateNormalizationRule?: string,
        public ameJan?: number,
        public ameFeb?: number,
        public ameMar?: number,
        public ameApr?: number,
        public ameMay?: number,
        public ameJun?: number,
        public ameJul?: number,
        public ameAug?: number,
        public ameSep?: number,
        public ameOct?: number,
        public ameNov?: number,
        public ameDec?: number,
        public createdDate?: any,
        public lastModified?: any,
        public siteAccountId?: number,
        public amuns?: Amun[],
        public amus?: Amu[],
        public amers?: Amer[],
        public ameIssues?: AmeIssue[],
        public ameActivities?: AmeActivity[],
        public invoices?: Invoice[],
        public invoicesPerMonth?: Array<Object>,
        public automaticUpdate?: boolean,
        public useRateRepository?: boolean,
        public addChargesToTariffRates?: boolean
    ) {
        this.active = false;
        this.useRateRepository = false;
    }
}

export class AmeIssue implements BaseEntity {
    constructor(public id?: number, public description?: string, public createdDate?: any, public ameId?: number) {}
}

export class Amer implements BaseEntity {
    constructor(
        public id?: number,
        public effectiveDate?: any,
        public chargeId?: string,
        public chargeActualName?: string,
        public usageType?: UsageType,
        public rateComponent?: string,
        public rate?: number,
        public ameId?: number,
        public invoiceId?: number,
        public rateType?: string,
        public usageAmount?: number,
        public billingMonth?: string,
        public amerApplyPercentages?: AmerApplyPercentages[],
        public amerSets?: AmerSet[],
        public rateTypeParsed?: string,
        public tierNumber?: number
    ) {}
}

export class Amu implements BaseEntity {
    constructor(
        public id?: number,
        public usage?: number,
        public approvedUsage?: number,
        public month?: Month,
        public usageType?: UsageType,
        public percentageOfTotal?: number,
        public rateComponent?: string,
        public createdDate?: any,
        public lastModified?: any,
        public ameId?: number,
        public date?: any
    ) {}
}

export class Amun implements BaseEntity {
    constructor(
        public id?: number,
        public month?: Month,
        public year?: number,
        public rateComponent?: string,
        public usage?: number,
        public approvedUsage?: number,
        public usageType?: UsageType,
        public ameId?: number,
        public date?: any,
        public usedForAmu?: boolean,
        public invalid?: boolean,
        public verified?: boolean,
        public version?: string,
        public percentageOfTotal?: number,
        public dateNormalizationRule?: string,
        public createdDate?: any,
        public lastModified?: any
    ) {}
}

export class AmerSet implements BaseEntity {
    constructor(public id?: number, public effectiveDate?: any, public amers?: Amer[], public ameId?: number) {}
}

export class AmerApplyPercentages implements BaseEntity {
    constructor(public id?: number, public chargeId?: string, public chargeActualName?: string, public amerId?: number) {}
}

export class AmeActivity implements BaseEntity {
    constructor(public id?: number, public description?: string, public createdDate?: any, public createdBy?: any, public ameId?: number) {}
}
