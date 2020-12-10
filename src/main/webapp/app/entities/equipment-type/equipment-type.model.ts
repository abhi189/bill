import { BaseEntity } from './../../shared';

export class EquipmentType implements BaseEntity {
    constructor(public id?: number, public code?: string, public name?: string, public equipmentCount?: number) {}
}
