import { BaseEntity } from './../../shared';

export class TariffMappingRule implements BaseEntity {
    constructor(
        public id?: number,
        public bdTariffNameId?: number,
        public bdTariffNameName?: string,
        public bdUtilityProviderKey?: string,
        public providerTariffCode?: string,
        public providerTariffName?: string,
        public providerName?: string,
        public providerId?: number
    ) {}
}
