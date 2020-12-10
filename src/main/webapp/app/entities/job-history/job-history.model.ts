import { BaseEntity } from './../../shared';

export const enum JobType {
    'URJANET_IMPORT',
    'SEND_INVOICES_FINANCE',
    'UPDATE_AME_CALCULATION',
    'AME_CALCULATION',
    'ZOHO_IMPORT'
}

export class JobHistory implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public type?: JobType,
        public createDate?: any,
        public siteAccountId?: number
    ) {}
}
