import { BaseEntity } from './../../shared';

export class RateUsageTypeMapping implements BaseEntity {
    constructor(
        public id?: number,
        public bdUsageUnit?: string,
        public chargeType?: string,
        public serviceType?: string,
        public rateMapped?: boolean,
        public providerName?: string,
        public providerId?: number,
        public tariffCount?: number
    ) {
        this.rateMapped = false;
    }
}
