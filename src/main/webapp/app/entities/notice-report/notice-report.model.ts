import { BaseEntity } from './../../shared';

export const enum ReportStatus {
    'COMPLETED',
    'PENDING'
}

export const enum CampaignType {
    'TEST',
    'OVERDUE',
    'DUNNING',
    'TERMINATION',
    'TOTAL'
}

export class NoticeReport implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public status?: ReportStatus,
        public eventCount?: number,
        public campaignType?: CampaignType
    ) {}
}

export class NoticeCountReport {
    constructor(
        public countOfOverdueNotices?: number,
        public countOfDunningNotices?: number,
        public countOfTerminationNotices?: number,
        public countOfErrors?: number
    ) {}
}
