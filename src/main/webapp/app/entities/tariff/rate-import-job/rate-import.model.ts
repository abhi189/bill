import { BaseEntity } from '../../../shared';

export enum TaskDescription {
    'IMPORT_TARIFF' = 'Import Tariff',
    'IMPORT_TARIFF_HISTORY' = 'Import Tariff Version History',
    'IMPORT_UTILITY' = 'Import Utility',
    'IMPORT_RATE' = 'Import Rate',
    'MAP_UTILITY' = 'Map Utility',
    'MAP_TARIFF' = 'Map Tariff',
    'MAP_RATES' = 'Map Rates',
    'VERIFY_UTILITY_MAPPING' = 'Verify Utility Mapping',
    'VERIFY_TARIFF_MAPPING' = 'Verify Tariff Mapping',
    'VERIFY_RATES_MAPPING' = 'Verify Rates Mapping',
    'UPDATE_UTILITY_RATEREPOSITORY' = 'Update Utility RateRepository',
    'UPDATE_TARIFF_RATEREPOSITORY' = 'Update Tariff/Utility RateRepository',
    'UPDATE_RATES_RATEREPOSITORY' = 'Update Rates RateRepository'
}

export enum TaskMapDescription {
    'MAP_UTILITY' = 'Map Utility',
    'MAP_TARIFF' = 'Map Tariff',
    'MAP_RATES' = 'Map Rates'
}

export enum TaskStatus {
    SUCCESS = 'Success',
    FAILED = 'Failed',
    PENDING = 'Pending'
}

export enum RateImportJobStatus {
    'SUCCESS' = 'Success',
    'FAILED' = 'Failed',
    'IN_PROGRESS' = 'In Progress'
}

export class RateImportJob implements BaseEntity {
    constructor(
        public id?: number,
        public tariffId?: number,
        public externalId?: number,
        public providerId?: number,
        public createdBy?: number,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public importRateJobTasks?: Task[],
        public totalTasks?: number,
        public completedTasks?: number,
        public failedTasks?: number,
        public percentageCompletion?: number,
        public percentageFailed?: number,
        public status?: RateImportJobStatus
    ) {}
}

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public name?: TaskDescription,
        public status?: TaskStatus,
        public rateImportJobId?: number,
        public code?: string,
        public codeMessage?: string
    ) {}
}

export const LinksErrorMessages = {
    'tariff.mapping.mapping.not.found': { url: '../../tariff-mapping-rule', queryParams: '' },
    'tariff.mapping.tariff.name.not.found': { url: '../../tariff-mapping-rule', queryParams: '' },
    'tariff.mapping.tariff.name.null': { url: '../../tariff-mapping-rule', queryParams: '' },
    'utility.mapping.mapping.not.found': { url: '../../utility-mapping-rule', queryParams: '' },
    'utility.mapping.utility.provider.key.null': { url: '../../utility-mapping-rule', queryParams: '' },
    'rate.mapping.rate.charge.mapping.not.found': { url: '../../rate-charge-mapping', queryParams: '' },
    'rate.mapping.rate.charge.mapping.not.confirmed': {
        url: '../../rate-charge-mapping',
        queryParams: { rateMapped: false, page: 1, size: 20, sort: 'id,asc' }
    },
    'rate.mapping.rate.component.mapping.not.found': { url: '../../rate-component-mapping', queryParams: '' },
    'rate.mapping.rate.component.mapping.not.confirmed': {
        url: '../../rate-component-mapping',
        queryParams: { rateMapped: false, page: 1, size: 20, sort: 'id,asc' }
    },
    'rate.mapping.rate.usage.type.mapping.not.found': { url: '../../rate-usage-type-mapping', queryParams: '' },
    'rate.mapping.rate.usage.type.mapping.not.confirmed': {
        url: '../../rate-usage-type-mapping',
        queryParams: { rateMapped: false, page: 1, size: 20, sort: 'id,asc' }
    }
};
