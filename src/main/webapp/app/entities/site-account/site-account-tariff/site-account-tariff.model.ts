import { Rate } from '../../tariff';
import { BaseEntity } from '../../../shared';

export class SiteAccountTariff implements BaseEntity {
    constructor(
        public id?: number,
        public budderflyId?: string,
        public accountNumber?: string,
        public tariffId?: number,
        public rates?: Rate[],
        public currentYear?: number
    ) {}
}
