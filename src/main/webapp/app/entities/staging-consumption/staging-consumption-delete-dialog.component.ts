import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagingConsumption } from './staging-consumption.model';
import { StagingConsumptionPopupService } from './staging-consumption-popup.service';
import { StagingConsumptionService } from './staging-consumption.service';

@Component({
    selector: 'jhi-staging-consumption-delete-dialog',
    templateUrl: './staging-consumption-delete-dialog.component.html'
})
export class StagingConsumptionDeleteDialogComponent {
    stagingConsumption: StagingConsumption;

    constructor(
        private stagingConsumptionService: StagingConsumptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stagingConsumptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stagingConsumptionListModification',
                content: 'Deleted an stagingConsumption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staging-consumption-delete-popup',
    template: ''
})
export class StagingConsumptionDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingConsumptionPopupService: StagingConsumptionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.stagingConsumptionPopupService.open(StagingConsumptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
