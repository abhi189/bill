import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';

import { BillingWebSharedModule } from '../../shared';

import {
    ElasticsearchReindexComponent,
    ElasticsearchReindexModalComponent,
    ElasticsearchReindexService,
    elasticsearchReindexRoute,
    ElasticsearchReindexComboSelectorComponent
} from './';

const ADMIN_ROUTES = [elasticsearchReindexRoute];

@NgModule({
    imports: [BillingWebSharedModule, AngularMultiSelectModule, RouterModule.forRoot(ADMIN_ROUTES, { useHash: true })],
    declarations: [ElasticsearchReindexComponent, ElasticsearchReindexModalComponent, ElasticsearchReindexComboSelectorComponent],
    entryComponents: [ElasticsearchReindexModalComponent, ElasticsearchReindexComboSelectorComponent],
    providers: [ElasticsearchReindexService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebElasticsearchReindexModule {}
