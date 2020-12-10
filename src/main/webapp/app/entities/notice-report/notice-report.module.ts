import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    NoticeReportService,
    NoticeReportComponent,
    NoticeReportDetailComponent,
    noticeReportRoute,
    NoticeReportResolvePagingParams,
    TriggerCampaignComponent
} from './';

import { NoticeReportEventsService } from './notice-report-events/notice-report-events.service';
import { NoticeReportEventsComponent } from './notice-report-events/notice-report-events.component';
import { NoticeReportEventsDetailComponent } from './notice-report-events/notice-report-events-detail.component';

const ENTITY_STATES = [...noticeReportRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NoticeReportComponent,
        NoticeReportDetailComponent,
        NoticeReportEventsComponent,
        NoticeReportEventsDetailComponent,
        TriggerCampaignComponent
    ],
    entryComponents: [NoticeReportComponent, TriggerCampaignComponent],
    providers: [NoticeReportService, NoticeReportResolvePagingParams, NoticeReportEventsService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebNoticeReportModule {}
