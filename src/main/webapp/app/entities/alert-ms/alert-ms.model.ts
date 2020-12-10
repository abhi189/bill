import { BaseEntity } from './../../shared';

export const enum AlertType {
    'EQUIPMENT',
    'OTHER'
}

export const enum SourceType {
    'KE2'
}

export const enum SeverityType {
    'HIGH',
    'MEDIUM',
    'LOW'
}

export const enum AlertStatus {
    'OPEN',
    'CLOSED'
}

export class AlertMs implements BaseEntity {
    constructor(
        public id?: number,
        public assignee?: string,
        public alertType?: AlertType,
        public budderflyId?: string,
        public item?: string,
        public description?: string,
        public source?: SourceType,
        public alertDate?: any,
        public severity?: SeverityType,
        public status?: AlertStatus,
        public siteId?: number
    ) {}
}

export class AlertMsReport {
    constructor(
        public reportByDayDTOs?: ReportByDay[],
        public reportByHourDTOs?: ReportByHour[],
        public reportByMonthDTOs?: ReportByMonth[],
        public reportByWeekDTOs?: ReportByWeek[]
    ) {}
}

export class ReportByDay {
    constructor(public count?: number, public day?: number, public month?: number, public year?: number) {}
}

export class ReportByHour {
    constructor(public count?: number, public hour?: number, public day?: number, public month?: number, public year?: number) {}
}

export class ReportByMonth {
    constructor(public count?: number, public month?: number, public year?: number, public monthName?: string) {}
}

export class ReportByWeek {
    constructor(public count?: number, public dayName?: string, public day?: number, public month?: number, public year?: number) {}
}
