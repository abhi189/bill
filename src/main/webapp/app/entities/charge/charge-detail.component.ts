import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ChargeService } from './charge.service';

@Component({
    selector: 'jhi-charge-detail',
    templateUrl: './charge-detail.component.html'
})
export class ChargeDetailComponent implements OnInit, OnDestroy {
    charge: Charge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private chargeService: ChargeService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCharges();
    }

    load(id) {
        this.chargeService.find(id).subscribe((chargeResponse: HttpResponse<Charge>) => {
            this.charge = chargeResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCharges() {
        this.eventSubscriber = this.eventManager.subscribe('chargeListModification', response => this.load(this.charge.id));
    }
}
