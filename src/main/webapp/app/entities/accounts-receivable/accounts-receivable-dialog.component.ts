import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountsReceivable } from './accounts-receivable.model';
import { AccountsReceivablePopupService } from './accounts-receivable-popup.service';
import { AccountsReceivableService } from './accounts-receivable.service';

@Component({
    selector: 'jhi-accounts-receivable-dialog',
    templateUrl: './accounts-receivable-dialog.component.html'
})
export class AccountsReceivableDialogComponent implements OnInit {
    accountsReceivable: AccountsReceivable;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private accountsReceivableService: AccountsReceivableService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accountsReceivable.id !== undefined) {
            this.subscribeToSaveResponse(this.accountsReceivableService.update(this.accountsReceivable));
        } else {
            this.subscribeToSaveResponse(this.accountsReceivableService.create(this.accountsReceivable));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AccountsReceivable>>) {
        result.subscribe(
            (res: HttpResponse<AccountsReceivable>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: AccountsReceivable) {
        this.eventManager.broadcast({ name: 'accountsReceivableListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-accounts-receivable-popup',
    template: ''
})
export class AccountsReceivablePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private accountsReceivablePopupService: AccountsReceivablePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.accountsReceivablePopupService.open(AccountsReceivableDialogComponent as Component, params['id']);
            } else {
                this.accountsReceivablePopupService.open(AccountsReceivableDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
