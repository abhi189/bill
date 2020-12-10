import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SiteAccount } from './site-account.model';
import { SiteAccountPopupService } from './site-account-popup.service';
import { SiteAccountService } from './site-account.service';

@Component({
    selector: 'jhi-site-account-delete-dialog',
    templateUrl: './site-account-delete-dialog.component.html'
})
export class SiteAccountDeleteDialogComponent {
    siteAccount: SiteAccount;
    processingAmes = false;
    processingInvoicess = false;

    constructor(
        private siteAccountService: SiteAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    deleteAmes(id: number) {
        this.processingAmes = true;
        this.siteAccountService.deleteAmes(id).subscribe(
            response => {
                this.processingAmes = false;
            },
            error => {
                console.log('Error while deleting AMES');
                this.processingAmes = false;
            }
        );
    }

    deleteInvoices(id: number) {
        this.processingInvoicess = true;
        this.siteAccountService.deleteInvoices(id).subscribe(
            response => {
                this.processingInvoicess = false;
            },
            error => {
                console.log('Error while deleting Invoices');
                this.processingInvoicess = false;
            }
        );
    }

    confirmDelete(id: number) {
        this.siteAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'siteAccountListModification',
                content: 'Deleted an siteAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-account-delete-popup',
    template: ''
})
export class SiteAccountDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private siteAccountPopupService: SiteAccountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.siteAccountPopupService.open(SiteAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
