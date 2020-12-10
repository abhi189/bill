import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Utility } from './utility.model';
import { UtilityService } from './utility.service';

@Component({
    selector: 'jhi-utility-detail',
    templateUrl: './utility-detail.component.html'
})
export class UtilityDetailComponent implements OnInit, OnDestroy {
    utility: Utility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private utilityService: UtilityService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInUtilities();
    }

    load(id) {
        this.utilityService.find(id).subscribe((utilityResponse: HttpResponse<Utility>) => {
            this.utility = utilityResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilities() {
        this.eventSubscriber = this.eventManager.subscribe('utilityListModification', response => this.load(this.utility.id));
    }
}
