import { BaseEntity } from '../../shared';

export const enum ProvisionStatus {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    IN_PROGRESS = 'IN_PROGRESS',
    DISCOVERED = 'DISCOVERED'
}

export class KittedItem implements BaseEntity {
    constructor(
        public id?: number,
        public externalId?: string,
        public kittedBy?: string,
        public kittedDate?: any,
        public tested?: string,
        public configuration?: string,
        public kitItemTypeId?: number,
        public provision?: ProvisionStatus,
        public status?: string
    ) // , public kitItemType?: string
    {}
}
