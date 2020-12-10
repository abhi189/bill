import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StagingMeter } from './staging-meter.model';
import { StagingMeterService } from './staging-meter.service';

@Component({
    selector: 'jhi-staging-meter-detail',
    templateUrl: './staging-meter-detail.component.html'
})
export class StagingMeterDetailComponent implements OnInit, OnDestroy {
    stagingMeter: StagingMeter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private stagingMeterService: StagingMeterService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInStagingMeters();
    }

    load(id) {
        this.stagingMeterService.find(id).subscribe((stagingMeterResponse: HttpResponse<StagingMeter>) => {
            this.stagingMeter = stagingMeterResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStagingMeters() {
        this.eventSubscriber = this.eventManager.subscribe('stagingMeterListModification', response => this.load(this.stagingMeter.id));
    }
}
