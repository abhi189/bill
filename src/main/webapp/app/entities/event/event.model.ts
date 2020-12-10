import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public eventTimestamp?: any,
        public eventType?: string,
        public message?: string,
        public event?: string,
        public duration?: number,
        public ipAddress?: string,
        public equipmentId?: number
    ) {}
}
