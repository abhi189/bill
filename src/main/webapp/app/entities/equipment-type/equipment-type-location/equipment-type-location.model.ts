import { BaseEntity } from '../../../shared';

export class EquipmentTypeLocation implements BaseEntity {
    constructor(public id?: number, public location?: string, public code?: string, public equipmentTypeId?: number) {}
}
