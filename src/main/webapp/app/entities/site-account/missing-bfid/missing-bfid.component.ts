import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster/index';
import { SiteAccount } from '../site-account.model';
import { SiteAccountService } from '../site-account.service';

@Component({
    selector: 'jhi-missing-bfid',
    templateUrl: './missing-bfid.component.html'
})
export class MissingBfidComponent {
    siteAccounts: SiteAccount[] = [];
    error = false;

    @Output() updatedSiteAccounts = new EventEmitter<Object>();

    @Input()
    set accounts(siteAccounts: any) {
        this.siteAccounts = siteAccounts;
    }

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private siteAccountService: SiteAccountService
    ) {}

    clear() {
        this.activeModal.close();
    }

    save() {
        // validation
        for (let i = 0; i < this.siteAccounts.length; i++) {
            if (typeof this.siteAccounts[i].budderflyId === 'undefined' || this.siteAccounts[i].budderflyId === null) {
                this.error = true;
                break;
            }

            if (!this.siteAccounts[i].budderflyId.includes('-')) {
                this.error = true;
                break;
            }

            const parts = this.siteAccounts[i].budderflyId.split('-');

            if (parts.length !== 2) {
                this.error = true;
                break;
            }

            if (parts[0].length === 0 || parts[1].length === 0) {
                this.error = true;
                break;
            }

            this.siteAccounts[i].budderflyId = parts[0].trim().toUpperCase() + '-' + parts[1].trim().toUpperCase();
        }

        if (this.error) {
            this.jhiAlertService.error('error.bfidProblem', null, null);
            this.error = false;
        } else {
            for (let i = 0; i < this.siteAccounts.length; i++) {
                this.siteAccountService.update(this.siteAccounts[i]).subscribe();
            }
            this.updatedSiteAccounts.emit({
                siteAccounts: this.siteAccounts
            });
            this.activeModal.close();
        }
    }
}
