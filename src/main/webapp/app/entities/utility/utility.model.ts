import { BaseEntity } from './../../shared';

export class Utility implements BaseEntity {
    constructor(
        public id?: number,
        public utilityProviderKey?: string,
        public name?: string,
        public country?: string,
        public state?: string
    ) {}
}
