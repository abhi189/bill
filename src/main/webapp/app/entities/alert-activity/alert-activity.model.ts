import { BaseEntity } from './../../shared';

export const enum AlertActivityAction {
    'CREATE',
    'MODIFY',
    'DELETE'
}

export const enum ActivityLevel {
    'ERROR',
    'WARNING',
    'INFO'
}

export class AlertActivity implements BaseEntity {
    constructor(
        public id?: number,
        public user?: string,
        public activity?: AlertActivityAction,
        public level?: ActivityLevel,
        public message?: any,
        public date?: any,
        public alertId?: number
    ) {}
}
