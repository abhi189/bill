import { BaseEntity } from './../../shared';

export const enum SiteStatus {
    'ACTIVE',
    'INACTIVE',
    'PENDING'
}

export const enum BillingType {
    'Forward',
    'Arrears_Discount'
}

export const enum PaymentType {
    'ETF',
    'Check',
    'Credit_Card'
}

export const enum SiteType {
    'Physical',
    'Virtual'
}

export class Site implements BaseEntity {
    constructor(
        public id?: number,
        public budderflyId?: string,
        public customerName?: string,
        public status?: SiteStatus,
        public companyType?: string,
        public storeNumber?: number,
        public address?: string,
        public city?: string,
        public state?: string,
        public zip?: string,
        public billingType?: BillingType,
        public paymentType?: PaymentType,
        public siteType?: SiteType,
        public ownerName?: string,
        public ownerEmail?: string,
        public ownerPhone?: string,
        public address1?: string,
        public address2?: string,
        public latitude?: string,
        public longitude?: string,
        public taxExempt?: boolean,
        public rollBilling?: boolean,
        public parentSiteId?: number,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedDate?: any,
        public lastModifiedBy?: string,
        public siteDiscountDTO?: SiteDiscount,
        public enableTicketDispatch?: boolean,
        public contactDeskId?: string,
        public timeZoneId?: string,
        public bfUuid?: string,
        public creditHold?: boolean
    ) {
        this.taxExempt = false;
        this.rollBilling = false;
        this.enableTicketDispatch = false;
    }
}

export class SiteDiscount implements BaseEntity {
    constructor(
        public id?: number,
        public discountId?: number,
        public name?: string,
        public budderflyId?: string,
        public percentage?: number,
        public autoUpdate?: boolean,
        public accrued?: boolean,
        public override?: boolean,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedDate?: any,
        public lastModifiedBy?: string
    ) {
        this.override = false;
    }
}

export class AllChartData {
    constructor(public data?: any, public colors?: any, public options?: any) {}
}

export class Monitor implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public externalId?: string,
        public monitorUuid?: string,
        public configuration?: string,
        public metricTemplate?: MetricTemplate,
        public monitorSource?: MonitorSource,
        public createdBy?: string,
        public createdDate?: string,
        public lastModifiedBy?: string,
        public lastModifiedDate?: string
    ) {}
}

export const enum MetricTemplate {
    POWER = 'POWER',
    TEMPERATURE = 'TEMPERATURE',
    REFRIGERATION = 'REFRIGERATION',
    STATUS = 'STATUS',
    POWER_AND_STATUS = 'POWER_AND_STATUS',
    ALERT = 'ALERT'
}

export const enum MonitorSource {
    SMAPPEE_MHA = 'SMAPPEE_MHA',
    SMAPPEE_GREENGRASS = 'SMAPPEE_GREENGRASS',
    MQTT_DEVICE_MHA = 'MQTT_DEVICE_MHA',
    MQTT_DEVICE_GREENGRASS = 'MQTT_DEVICE_GREENGRASS',
    KE2_MHA = 'KE2_MHA',
    KE2_GREENGRASS = 'KE2_GREENGRASS',
    KE2_PORTAL = 'KE2_PORTAL',
    KE2_EMAIL = 'KE2_EMAIL',
    BACNET_MHA = 'BACNET_MHA'
}

export class RequestDTO {
    constructor(public date?: string, public timeZoneId?: string, public revertToClientTz?: boolean) {}
}
