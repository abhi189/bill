import { BaseEntity } from './../../shared';

export const enum AlertPriority {
    'HIGH',
    'MEDIUM',
    'LOW'
}

export const enum AlertCategory {
    'CHARGE',
    'CONSUMPTION',
    'DEMAND'
}

export class Alert implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public priority?: AlertPriority,
        public category?: AlertCategory,
        public assignedTo?: string,
        public createdDate?: any,
        public lastModified?: any,
        public siteAccountId?: number
    ) {}
}
