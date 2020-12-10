import { BaseEntity } from './../../shared';

export class Consumption implements BaseEntity {
    constructor(
        public id?: number,
        public measurementType?: string,
        public rateComponent?: string,
        public intervalStart?: any,
        public intervalEnd?: any,
        public usageAmount?: number,
        public loadFactor?: number,
        public meterReadCurrent?: number,
        public meterReadPrevious?: number,
        public usageConstantMultiplier?: number,
        public usageConversionMultiplier?: number,
        public invoiceId?: number,
        public energyUnit?: string,
        public previousMeterReadType?: string,
        public meterReadType?: string,
        public lastModifiedBy?: string,
        public lastModified?: any
    ) {}
}
