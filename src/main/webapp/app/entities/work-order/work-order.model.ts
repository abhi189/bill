import { BaseEntity } from './../../shared';

export class WorkOrder implements BaseEntity {
    constructor(
        public id?: number,
        public workOrderNumber?: number,
        public status?: string,
        public scheduledDateAndTime?: any,
        public numberOfDaysToComplete?: number,
        public estimatedCompletionDate?: any,
        public taskStatusLink?: string,
        public jhiLabel?: string,
        public sugarCrmReference?: string,
        public overrideScheduledDateCheck?: boolean,
        public supportContactName?: string,
        public additionalContractors?: string,
        public creationDate?: any,
        public contractorEmail?: string,
        public jhiUser?: string,
        public workOrderLink?: string,
        public dueDate?: any,
        public notificationEmail?: string,
        public netsuiteId?: string,
        public additionalEmails?: string,
        public coordinatorName?: string,
        public jobRequest?: string,
        public assignedContractorInfo?: string,
        public reopenReason?: string,
        public primaryTask?: string,
        public supportContactEmail?: string,
        public completionDate?: any,
        public createdDate?: any,
        public lastModifiedDate?: any,
        public workItems?: WorkItem[],
        public siteId?: number
    ) {
        this.overrideScheduledDateCheck = false;
    }
}

export class WorkItem implements BaseEntity {
    constructor(
        public id?: number,
        public workTaskName?: string,
        public workSiteName?: string,
        public status?: string,
        public statusComment?: string,
        public serviceReason?: string,
        public manHours?: number,
        public laborCostInternal?: string,
        public workTaskId?: number,
        public siteId?: number,
        public workOrderId?: number
    ) {}
}

export enum WorkOrderStatus {
    OPEN = 'Open',
    COMPLETED = 'Completed',
    SCHEDULED = 'Scheduled',
    REVIEW = 'Review',
    CANCELLED = 'Cancelled',
    ASSIGNED = 'Assigned',
    ON_HOLD = 'On Hold'
}
