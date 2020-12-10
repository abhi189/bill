import { BaseEntity } from './../../shared';

export class Invoice implements BaseEntity {
    constructor(
        public id?: number,
        public electricSupplier?: string,
        public intervalStart?: any,
        public intervalEnd?: any,
        public billingDays?: number,
        public newCharges?: number,
        public peakKWH?: number,
        public midPeakKWH?: number,
        public offPeakKWH?: number,
        public totalKWH?: number,
        public peakKW?: number,
        public midPeakKW?: number,
        public offPeakKW?: number,
        public maxKW?: number,
        public urjanetId?: string,
        public siteAccountId?: number,
        public charges?: BaseEntity[],
        public consumptions?: BaseEntity[],
        public meters?: Meter[],
        public invalid?: boolean,
        public imported?: boolean,
        public readyForImport?: boolean,
        public importedManually?: boolean,
        public ignoreImport?: boolean,
        public sourceLink?: string,
        public budderflyRepositoryLink?: string,
        public budderflyInvoiceNumber?: string
    ) {}
}

export class Meter implements BaseEntity {
    constructor(
        public id?: number,
        public intervalStart?: any,
        public intervalEnd?: any,
        public invoiceId?: number,
        public meterId?: number,
        public meterNumber?: number,
        public serviceType?: string,
        public serviceAddress?: string,
        public serviceCity?: string,
        public serviceState?: string,
        public tariff?: string,
        public podId?: string,
        public lastModifiedBy?: string,
        public lastModified?: string
    ) {}
}
