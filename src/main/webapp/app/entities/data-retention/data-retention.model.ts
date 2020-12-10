import { BaseEntity } from './../../shared';

export class DataRetention implements BaseEntity {
    constructor(
        public id?: number,
        public serviceName?: string,
        public serviceDescription?: string,
        public serviceRetentionPeriodYear?: number,
        public serviceRetentionPeriodMonth?: number,
        public serviceRetentionPeriodDay?: number,
        public serviceEndpoint?: string
    ) {}
}
