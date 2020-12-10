import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    JobExecutionAuditLogService,
    JobExecutionAuditLogPopupService,
    JobExecutionAuditLogComponent,
    JobExecutionAuditLogDetailComponent,
    JobExecutionAuditLogDialogComponent,
    JobExecutionAuditLogPopupComponent,
    JobExecutionAuditLogDeletePopupComponent,
    JobExecutionAuditLogDeleteDialogComponent,
    jobExecutionAuditLogRoute,
    jobExecutionAuditLogPopupRoute,
    JobExecutionAuditLogResolvePagingParams
} from './';

const ENTITY_STATES = [...jobExecutionAuditLogRoute, ...jobExecutionAuditLogPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobExecutionAuditLogComponent,
        JobExecutionAuditLogDetailComponent,
        JobExecutionAuditLogDialogComponent,
        JobExecutionAuditLogDeleteDialogComponent,
        JobExecutionAuditLogPopupComponent,
        JobExecutionAuditLogDeletePopupComponent
    ],
    entryComponents: [
        JobExecutionAuditLogComponent,
        JobExecutionAuditLogDialogComponent,
        JobExecutionAuditLogPopupComponent,
        JobExecutionAuditLogDeleteDialogComponent,
        JobExecutionAuditLogDeletePopupComponent
    ],
    providers: [JobExecutionAuditLogService, JobExecutionAuditLogPopupService, JobExecutionAuditLogResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebJobExecutionAuditLogModule {}
