import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SiteDiscount } from './site.model';
import { SiteService } from './site.service';
import { SiteDiscountPopupService } from './site-discount-popup.service';

@Component({
    selector: 'jhi-site-discount-delete-dialog',
    templateUrl: './site-discount-delete-dialog.component.html'
})
export class SiteDiscountDeleteDialogComponent {
    siteDiscount: SiteDiscount;

    constructor(private siteService: SiteService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.siteService.deleteSiteDiscount(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'siteDiscountModification',
                content: 'Deleted a siteDiscount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-discount-delete-popup',
    template: ''
})
export class SiteDiscountDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private siteDiscountPopupService: SiteDiscountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.siteDiscountPopupService.open(SiteDiscountDeleteDialogComponent as Component, params['siteDiscountId']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
