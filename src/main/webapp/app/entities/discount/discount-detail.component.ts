import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Discount } from './discount.model';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-detail',
    templateUrl: './discount-detail.component.html',
    styles: []
})
export class DiscountDetailComponent implements OnInit, OnDestroy {
    discount: Discount;
    originalDiscount: Discount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private discountService: DiscountService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInDiscounts();
    }

    load(id) {
        this.discountService.find(id).subscribe((discountResponse: HttpResponse<Discount>) => {
            this.discount = discountResponse.body;
            this.originalDiscount = Object.assign({}, this.discount);
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscounts() {
        this.eventSubscriber = this.eventManager.subscribe('discountListModification', response => this.load(this.discount.id));
    }
}
