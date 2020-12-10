import { BaseEntity } from './../../shared';
import { TaskDescription } from '../tariff/rate-import-job/rate-import.model';

export class ImportMapping implements BaseEntity {
    public id: number;
    public tariffId: number;
    public externalTariffId: number;
    public jobId: number;
    public currentMapJobTask: TaskDescription;

    constructor() {}
}
