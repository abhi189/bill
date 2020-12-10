import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Site, SiteDiscount } from './site.model';
import { SiteService } from './site.service';
import { SiteDiscountPopupService } from './site-discount-popup.service';
import { Discount, DiscountService } from '../discount';

@Component({
    selector: 'jhi-site-discount-dialog',
    templateUrl: './site-discount-dialog.component.html',
    styles: [
        `
            select.custom-select {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
            }
        `
    ]
})
export class SiteDiscountDialogComponent implements OnInit {
    siteDiscount: SiteDiscount;
    isSaving: boolean;
    siteSelected: Site;
    searchText: string;
    searching = false;
    searchFailed = false;
    discounts: Discount[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private siteService: SiteService,
        private discountService: DiscountService,
        private eventManager: JhiEventManager
    ) {
        this.siteSelected = null;
    }

    ngOnInit() {
        this.getDiscounts();
        this.isSaving = false;
        this.siteDiscount.budderflyId = this.siteService.budderflyId;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.siteDiscount.id !== undefined) {
            this.subscribeToSaveResponse(this.siteService.updateSiteDiscount(this.siteDiscount));
        } else {
            this.subscribeToSaveResponse(this.siteService.createSiteDiscount(this.siteDiscount));
        }
    }

    getDiscounts() {
        this.discountService.query().subscribe(
            (res: HttpResponse<Discount[]>) => {
                this.discounts = res.body;
            },
            error => console.log('Error getting Discounts', error)
        );
    }

    onSelectDiscountName(discountName) {
        if (discountName) {
            this.siteDiscount.discountId = this.getAssociatedIdWithDiscountName(discountName);
        }
    }

    private getAssociatedIdWithDiscountName(discountName) {
        const associatedDiscount: Discount = this.discounts.find(d => {
            return d.discountName === discountName;
        });
        return associatedDiscount.id;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Site>>) {
        result.subscribe((res: HttpResponse<SiteDiscount>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SiteDiscount) {
        this.eventManager.broadcast({ name: 'siteDiscountModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-site-discount-popup',
    template: ''
})
export class SiteDiscountPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private siteDiscountPopupService: SiteDiscountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['siteDiscountId']) {
                this.siteDiscountPopupService.open(SiteDiscountDialogComponent as Component, params['siteDiscountId']);
            } else {
                this.siteDiscountPopupService.open(SiteDiscountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
