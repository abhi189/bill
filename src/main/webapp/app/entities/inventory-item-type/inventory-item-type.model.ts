import { BaseEntity } from '../../shared/model/base-entity';

export class InventoryItemType implements BaseEntity {
    constructor(public id?: number, public code?: string, public name?: string) {}
}
