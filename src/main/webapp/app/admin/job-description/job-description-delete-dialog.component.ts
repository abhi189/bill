import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobDescription } from './job-description.model';
import { JobDescriptionPopupService } from './job-description-popup.service';
import { JobDescriptionService } from './job-description.service';

@Component({
    selector: 'jhi-job-description-delete-dialog',
    templateUrl: './job-description-delete-dialog.component.html'
})
export class JobDescriptionDeleteDialogComponent {
    jobDescription: JobDescription;

    constructor(
        private jobDescriptionService: JobDescriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobDescriptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobDescriptionListModification',
                content: 'Deleted an jobDescription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-description-delete-popup',
    template: ''
})
export class JobDescriptionDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobDescriptionPopupService: JobDescriptionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.jobDescriptionPopupService.open(JobDescriptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
