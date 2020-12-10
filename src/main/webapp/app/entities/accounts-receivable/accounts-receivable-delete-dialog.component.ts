import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountsReceivable } from './accounts-receivable.model';
import { AccountsReceivablePopupService } from './accounts-receivable-popup.service';
import { AccountsReceivableService } from './accounts-receivable.service';

@Component({
    selector: 'jhi-accounts-receivable-delete-dialog',
    templateUrl: './accounts-receivable-delete-dialog.component.html'
})
export class AccountsReceivableDeleteDialogComponent {
    accountsReceivable: AccountsReceivable;

    constructor(
        private accountsReceivableService: AccountsReceivableService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountsReceivableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountsReceivableListModification',
                content: 'Deleted an accountsReceivable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounts-receivable-delete-popup',
    template: ''
})
export class AccountsReceivableDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private accountsReceivablePopupService: AccountsReceivablePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.accountsReceivablePopupService.open(AccountsReceivableDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
