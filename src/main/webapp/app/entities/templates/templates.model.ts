import { BaseEntity } from './../../shared';

export const enum TemplateType {
    'INVOICE_TEMPLATE',
    'EMAIL_TEMPLATE'
}

export class Templates implements BaseEntity {
    constructor(public id?: number, public customerType?: string, public templateType?: TemplateType, public templateName?: string) {}
}
