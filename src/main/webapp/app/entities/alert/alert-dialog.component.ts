import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Alert } from './alert.model';
import { AlertPopupService } from './alert-popup.service';
import { AlertService } from './alert.service';
import { SiteAccount, SiteAccountService } from '../site-account';

@Component({
    selector: 'jhi-alert-dialog',
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialogComponent implements OnInit {
    alert: Alert;
    isSaving: boolean;

    siteaccounts: SiteAccount[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alertService: AlertService,
        private siteAccountService: SiteAccountService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.siteAccountService.query().subscribe(
            (res: HttpResponse<SiteAccount[]>) => {
                this.siteaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alert.id !== undefined) {
            this.subscribeToSaveResponse(this.alertService.update(this.alert));
        } else {
            this.subscribeToSaveResponse(this.alertService.create(this.alert));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Alert>>) {
        result.subscribe((res: HttpResponse<Alert>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Alert) {
        this.eventManager.broadcast({ name: 'alertListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSiteAccountById(index: number, item: SiteAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-alert-popup',
    template: ''
})
export class AlertPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertPopupService: AlertPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.alertPopupService.open(AlertDialogComponent as Component, params['id']);
            } else {
                this.alertPopupService.open(AlertDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
