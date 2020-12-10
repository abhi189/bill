import { BaseEntity } from './../../shared';

export class RateComponentMapping implements BaseEntity {
    constructor(
        public id?: number,
        public bdRateComponent?: string,
        public bdRateType?: string,
        public chargeType?: string,
        public chargePeriod?: string,
        public tier?: string,
        public touName?: string,
        public touType?: string,
        public rateMapped?: boolean,
        public providerName?: string,
        public providerId?: number,
        public tariffCount?: number
    ) {
        this.rateMapped = false;
    }
}
