import { BaseEntity } from './../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public contactType?: string,
        public name?: string,
        public phoneNumber?: string,
        public webPage?: string,
        public notes?: string,
        public city?: string,
        public street?: string,
        public zipCode?: string,
        public country?: string,
        public contactEmail?: string,
        public createdDate?: any,
        public lastModifyDate?: any,
        public modifiedBy?: string,
        public createdBy?: string
    ) {}
}
