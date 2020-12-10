import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobDescription } from './job-description.model';
import { JobDescriptionService } from './job-description.service';

@Component({
    selector: 'jhi-job-description-detail',
    templateUrl: './job-description-detail.component.html'
})
export class JobDescriptionDetailComponent implements OnInit, OnDestroy {
    jobDescription: JobDescription;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobDescriptionService: JobDescriptionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInJobDescriptions();
    }

    load(id) {
        this.jobDescriptionService.find(id).subscribe((jobDescriptionResponse: HttpResponse<JobDescription>) => {
            this.jobDescription = jobDescriptionResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobDescriptions() {
        this.eventSubscriber = this.eventManager.subscribe('jobDescriptionListModification', response => this.load(this.jobDescription.id));
    }
}
