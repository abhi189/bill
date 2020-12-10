import { BaseEntity } from './../../shared';

export const enum AmeAlgorithm {
    'LATEST_RATES',
    'STANDARD',
    'LATEST_RATES_V2',
    'LATEST_RATES_V3',
    'LOWEST_PERIOD'
}

export class AmuConfiguration implements BaseEntity {
    constructor(
        public id?: number,
        public customerType?: string,
        public utilityProvider?: string,
        public message?: string,
        public algorithm?: AmeAlgorithm
    ) {}
}
