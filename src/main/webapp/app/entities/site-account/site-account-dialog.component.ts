import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SiteAccount } from './site-account.model';
import { SiteAccountPopupService } from './site-account-popup.service';
import { SiteAccountService } from './site-account.service';

@Component({
    selector: 'jhi-site-account-dialog',
    templateUrl: './site-account-dialog.component.html'
})
export class SiteAccountDialogComponent implements OnInit {
    siteAccount: SiteAccount;
    sitesAccounts: SiteAccount[];
    takeOverDateDp: any;
    isSaving: boolean;
    takeOverDateNgbDate: NgbDateStruct;

    constructor(
        public activeModal: NgbActiveModal,
        private siteAccountService: SiteAccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        public router: Router,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.isSaving = false;
        if (!this.siteAccount.requestedDate) {
            this.siteAccount.requestedDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        }

        if (this.siteAccount.takeOverDate) {
            const dateString = this.siteAccount.takeOverDate.split('-');
            this.takeOverDateNgbDate = <NgbDateStruct>{ year: +dateString[0], month: +dateString[1], day: +dateString[2] };
        }

        // Prevents error when opening the popup for creating
        // This is only necessary for editing.
        if (this.siteAccount.budderflyId && this.siteAccount.id > 0) {
            this.siteAccountService.relatedSitesAccounts(this.siteAccount.budderflyId, this.siteAccount.id).subscribe(
                (res: HttpResponse<SiteAccount[]>) => {
                    this.sitesAccounts = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    // Conversion is necessary because the datepicker uses a different object
    onTakeOverDateChange(takeOverDateNgbDate: NgbDateStruct) {
        this.siteAccount.takeOverDate = takeOverDateNgbDate
            ? new Date(takeOverDateNgbDate.year, takeOverDateNgbDate.month - 1, takeOverDateNgbDate.day)
            : null;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.siteAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.siteAccountService.update(this.siteAccount));
        } else {
            this.subscribeToSaveResponse(this.siteAccountService.create(this.siteAccount));
        }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SiteAccount>>) {
        result.subscribe((res: HttpResponse<SiteAccount>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SiteAccount) {
        this.eventManager.broadcast({ name: 'siteAccountListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-site-account-popup',
    template: ''
})
export class SiteAccountPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private siteAccountPopupService: SiteAccountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.siteAccountPopupService.open(SiteAccountDialogComponent as Component, params['id']);
            } else {
                this.siteAccountPopupService.open(SiteAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
