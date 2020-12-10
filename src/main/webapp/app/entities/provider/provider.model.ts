import { BaseEntity } from './../../shared';

export class Provider implements BaseEntity {
    constructor(public id?: number, public name?: string, public stagingUtilities?: BaseEntity[]) {}
}
