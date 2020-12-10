export class ChargeUtilityChargeConfiguration {
    constructor(
        public serviceType?: string,
        public chargeId?: string,
        public chargeActualName?: string,
        public utilityProvider?: string,
        public utilityChargeConfigurationId?: string,
        public utilityChargeConfigurationServiceType?: string,
        public utilityChargeConfigurationChargeId?: string,
        public utilityChargeConfigurationChargeActualName?: string,
        public utilityChargeConfigurationUtilityProvider?: string,
        public utilityChargeConfigurationCategory?: string
    ) {}
}
