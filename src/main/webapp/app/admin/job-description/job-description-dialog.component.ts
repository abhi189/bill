import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobDescription } from './job-description.model';
import { JobDescriptionPopupService } from './job-description-popup.service';
import { JobDescriptionService } from './job-description.service';

@Component({
    selector: 'jhi-job-description-dialog',
    templateUrl: './job-description-dialog.component.html'
})
export class JobDescriptionDialogComponent implements OnInit {
    jobDescription: JobDescription;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jobDescriptionService: JobDescriptionService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobDescription.id !== undefined) {
            this.subscribeToSaveResponse(this.jobDescriptionService.update(this.jobDescription));
        } else {
            this.subscribeToSaveResponse(this.jobDescriptionService.create(this.jobDescription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobDescription>>) {
        result.subscribe(
            (res: HttpResponse<JobDescription>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: JobDescription) {
        this.eventManager.broadcast({ name: 'jobDescriptionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-job-description-popup',
    template: ''
})
export class JobDescriptionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobDescriptionPopupService: JobDescriptionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.jobDescriptionPopupService.open(JobDescriptionDialogComponent as Component, params['id']);
            } else {
                this.jobDescriptionPopupService.open(JobDescriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
