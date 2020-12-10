import { BaseEntity } from './../../shared';

export class WebhookEventLogger implements BaseEntity {
    constructor(
        public id?: number,
        public eventId?: string,
        public eventType?: string,
        public eventDate?: any,
        public eventEndpoint?: string,
        public status?: string,
        public providerId?: string
    ) {}
}
