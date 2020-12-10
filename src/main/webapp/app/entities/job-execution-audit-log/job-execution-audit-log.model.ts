import { BaseEntity } from './../../shared';

export const enum JobExecutionType {
    'ERROR',
    ' SUCCESS'
}

export class JobExecutionAuditLog implements BaseEntity {
    constructor(
        public id?: number,
        public jobExecutionType?: JobExecutionType,
        public executionMessage?: string,
        public executionDate?: any,
        public jobDescriptionId?: number
    ) {}
}
