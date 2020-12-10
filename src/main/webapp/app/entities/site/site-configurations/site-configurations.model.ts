import { BaseEntity } from './../../../shared';

export class SiteNoticeType implements BaseEntity {
    constructor(
        public id?: number,
        public siteBfUuid?: string,
        public siteId?: number,
        public enabled?: boolean,
        public noticeTypeId?: number,
        public noticeTypeType?: string
    ) {}
}

export class SiteAlertType implements BaseEntity {
    constructor(
        public id?: number,
        public siteBfUuid?: string,
        public siteId?: number,
        public enabled?: boolean,
        public alertTypeId?: number,
        public alertTypeType?: string
    ) {}
}
