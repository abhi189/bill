import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BudderflyInvoiceValidation } from './budderfly-invoice-validation.model';
import { BudderflyInvoiceValidationService } from './budderfly-invoice-validation.service';

@Component({
    selector: 'jhi-budderfly-invoice-validation-detail',
    templateUrl: './budderfly-invoice-validation-detail.component.html'
})
export class BudderflyInvoiceValidationDetailComponent implements OnInit, OnDestroy {
    budderflyInvoiceValidation: BudderflyInvoiceValidation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private budderflyInvoiceValidationService: BudderflyInvoiceValidationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInBudderflyInvoiceValidations();
    }

    load(id) {
        this.budderflyInvoiceValidationService
            .find(id)
            .subscribe((budderflyInvoiceValidationResponse: HttpResponse<BudderflyInvoiceValidation>) => {
                this.budderflyInvoiceValidation = budderflyInvoiceValidationResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBudderflyInvoiceValidations() {
        this.eventSubscriber = this.eventManager.subscribe('budderflyInvoiceValidationListModification', response =>
            this.load(this.budderflyInvoiceValidation.id)
        );
    }
}
