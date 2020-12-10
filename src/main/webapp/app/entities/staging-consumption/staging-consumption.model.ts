import { BaseEntity } from './../../shared';

export class StagingConsumption implements BaseEntity {
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
        public calorificValue?: number,
        public energyUnit?: string,
        public loadType?: string,
        public meterReadDate?: any,
        public meterReadDelta?: number,
        public meterReadDeltaUsageUnit?: string,
        public meterReadType?: string,
        public meterReadTypeAsPrinted?: string,
        public powerFactor?: number,
        public previousMeterReadDate?: any,
        public previousMeterReadType?: string,
        public previousMeterReadTypeAsPrinted?: string,
        public usageActualName?: string,
        public createdDate?: any,
        public lastModified?: any,
        public invoiceId?: number,
        public meterLogicalMeterId?: string,
        public meterId?: number
    ) {}
}
