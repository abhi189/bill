import { BaseEntity } from './../../shared';

export class InventoryItem implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public installDate?: any,
        public budderflyId?: string,
        public externalId?: string,
        public inventoryItemTypeName?: string,
        public inventoryItemTypeId?: number
    ) {}
}
