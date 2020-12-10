import { BaseEntity } from './../../shared';

export class AlertNote implements BaseEntity {
    constructor(public id?: number, public date?: any, public note?: any, public customerFacing?: boolean, public alertNoteId?: number) {
        this.customerFacing = false;
    }
}
