import { BaseEntity } from './../../shared';

export class InvoiceUpload implements BaseEntity {
    constructor(
        public id?: number,
        public fileName?: string,
        public filePath?: string,
        public status?: string,
        public message?: string,
        public createdBy?: string,
        public createdDate?: any,
        public fileUrl?: string,
        public stagingInvoices?: BaseEntity[]
    ) {}
}
