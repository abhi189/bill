import { BaseEntity } from './../../shared';

export const enum BillingCycleActivityAction {
    'ADDING_SITE',
    'EMAILING',
    'DELETING_INVOICE',
    'EXPORT',
    'CREATION',
    'UPDATE'
}

export const enum ActivityLevel {
    'ERROR',
    'WARNING',
    'INFO'
}

export class BillingCycleActivity implements BaseEntity {
    constructor(
        public id?: number,
        public user?: string,
        public activity?: BillingCycleActivityAction,
        public level?: ActivityLevel,
        public message?: string,
        public activityDate?: any,
        public billingCycleName?: string,
        public billingCycleId?: number
    ) {}
}
