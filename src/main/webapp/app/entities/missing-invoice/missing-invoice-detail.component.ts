import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MissingInvoice } from './missing-invoice.model';
import { MissingInvoiceService } from './missing-invoice.service';

@Component({
    selector: 'jhi-missing-invoice-detail',
    templateUrl: './missing-invoice-detail.component.html'
})
export class MissingInvoiceDetailComponent implements OnInit, OnDestroy {
    missingInvoice: MissingInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private missingInvoiceService: MissingInvoiceService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInMissingInvoices();
    }

    load(id) {
        this.missingInvoiceService.find(id).subscribe((missingInvoiceResponse: HttpResponse<MissingInvoice>) => {
            this.missingInvoice = missingInvoiceResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMissingInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('missingInvoiceListModification', response => this.load(this.missingInvoice.id));
    }
}
