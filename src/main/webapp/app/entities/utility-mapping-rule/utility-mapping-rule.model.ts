import { BaseEntity } from './../../shared';

export class UtilityMappingRule implements BaseEntity {
    constructor(
        public id?: number,
        public bdUtilityProviderKey?: string,
        public providerUtilityName?: string,
        public providerState?: string,
        public providerCountry?: string,
        public providerName?: string,
        public providerId?: number
    ) {}
}
