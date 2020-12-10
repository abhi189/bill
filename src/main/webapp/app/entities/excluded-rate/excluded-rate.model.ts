import { BaseEntity } from './../../shared';

export class ExcludedRate implements BaseEntity {
    constructor(
        public id?: number,
        public chargeId?: string,
        public chargeActualDescriptionName?: string,
        public customerType?: string,
        public utilityProvider?: string,
        public siteId?: string,
        public active?: boolean
    ) {
        this.active = false;
    }
}
