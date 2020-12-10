import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { NoticeReportService } from './notice-report.service';

@Component({
    selector: 'jhi-trigger-campaign',
    templateUrl: './trigger-campaign.component.html'
})
export class TriggerCampaignComponent {
    selectedCampaign: string;

    @Output() campaignExecuted = new EventEmitter<Object>();

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private noticeReportService: NoticeReportService
    ) {
        this.selectedCampaign = 'TEST';
    }

    clear() {
        this.activeModal.close();
    }

    execute() {
        this.noticeReportService
            .triggerCampaign(this.selectedCampaign)
            .subscribe((res: HttpResponse<any>) => this.success(), (res: HttpErrorResponse) => this.onError(res.message));
        this.activeModal.close();
    }

    onSelectChange(evt: any) {
        this.selectedCampaign = evt.srcElement.value;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private success() {
        this.campaignExecuted.emit({
            selectedCampaign: this.selectedCampaign
        });
    }
}
