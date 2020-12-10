import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Tax } from './tax.model';
import { TaxService } from './tax.service';

@Component({
    selector: 'jhi-tax-detail',
    templateUrl: './tax-detail.component.html'
})
export class TaxDetailComponent implements OnInit, OnDestroy {
    tax: Tax;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private taxService: TaxService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTaxes();
    }

    load(id) {
        this.taxService.find(id).subscribe((taxResponse: HttpResponse<Tax>) => {
            this.tax = taxResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTaxes() {
        this.eventSubscriber = this.eventManager.subscribe('taxListModification', response => this.load(this.tax.id));
    }
}
