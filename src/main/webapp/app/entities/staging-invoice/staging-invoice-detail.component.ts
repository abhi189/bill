import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StagingInvoice } from './staging-invoice.model';
import { StagingInvoiceService } from './staging-invoice.service';

@Component({
    selector: 'jhi-staging-invoice-detail',
    templateUrl: './staging-invoice-detail.component.html'
})
export class StagingInvoiceDetailComponent implements OnInit, OnDestroy {
    stagingInvoice: StagingInvoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stagingInvoiceService: StagingInvoiceService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInStagingInvoices();
    }

    load(id) {
        this.stagingInvoiceService.find(id).subscribe((stagingInvoiceResponse: HttpResponse<StagingInvoice>) => {
            this.stagingInvoice = stagingInvoiceResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStagingInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('stagingInvoiceListModification', response => this.load(this.stagingInvoice.id));
    }
}
