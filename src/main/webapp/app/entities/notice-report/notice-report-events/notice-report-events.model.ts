import { BaseEntity } from './../../../shared';

export const enum NoticeType {
    'OVERDUE_NOTICE',
    'DUNNING_NOTICE',
    'TERMINATION_NOTICE'
}

export class NoticeReportEvents implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public budderflyId?: string,
        public openBalance?: number,
        public numberOfDueInvoices?: number,
        public optOut?: boolean,
        public invoiceDaysOverdue?: number,
        public invoiceNumber?: string,
        public invoiceAmountDue?: number,
        public invoiceDueDate?: any,
        public noticeType?: NoticeType,
        public message?: string,
        public noticeReportId?: number,
        public ticketUrl?: string,
        public eventProcessorResolution?: string,
        public alertResolution?: string
    ) {
        this.optOut = false;
    }
}
