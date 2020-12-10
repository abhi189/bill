import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataRetention } from './data-retention.model';
import { DataRetentionService } from './data-retention.service';

@Component({
    selector: 'jhi-data-retention-detail',
    templateUrl: './data-retention-detail.component.html'
})
export class DataRetentionDetailComponent implements OnInit, OnDestroy {
    dataRetention: DataRetention;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private dataRetentionService: DataRetentionService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInDataRetentions();
    }

    load(id) {
        this.dataRetentionService.find(id).subscribe((dataRetentionResponse: HttpResponse<DataRetention>) => {
            this.dataRetention = dataRetentionResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataRetentions() {
        this.eventSubscriber = this.eventManager.subscribe('dataRetentionListModification', response => this.load(this.dataRetention.id));
    }
}
