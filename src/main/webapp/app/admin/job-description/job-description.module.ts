import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    JobDescriptionService,
    JobDescriptionPopupService,
    JobDescriptionComponent,
    JobDescriptionDetailComponent,
    JobDescriptionDialogComponent,
    JobDescriptionPopupComponent,
    JobDescriptionDeletePopupComponent,
    JobDescriptionDeleteDialogComponent,
    jobDescriptionRoute,
    jobDescriptionPopupRoute,
    JobDescriptionResolvePagingParams,
    JobDescriptionJobExecutionAuditComponent
} from '../';

const ENTITY_STATES = [...jobDescriptionRoute, ...jobDescriptionPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobDescriptionComponent,
        JobDescriptionDetailComponent,
        JobDescriptionDialogComponent,
        JobDescriptionDeleteDialogComponent,
        JobDescriptionPopupComponent,
        JobDescriptionDeletePopupComponent,
        JobDescriptionJobExecutionAuditComponent
    ],
    entryComponents: [
        JobDescriptionComponent,
        JobDescriptionDialogComponent,
        JobDescriptionPopupComponent,
        JobDescriptionDeleteDialogComponent,
        JobDescriptionDeletePopupComponent
    ],
    providers: [JobDescriptionService, JobDescriptionPopupService, JobDescriptionResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobDescriptionModule {}
