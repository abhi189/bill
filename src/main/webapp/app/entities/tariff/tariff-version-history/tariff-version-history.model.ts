import { BaseEntity } from '../../../shared';

export class TariffVersionHistory implements BaseEntity {
    constructor(
        public id?: number,
        public effectiveDate?: any,
        public endDate?: any,
        public documentUrl?: string,
        public tariffTariffName?: string,
        public tariffId?: number
    ) {}
}
