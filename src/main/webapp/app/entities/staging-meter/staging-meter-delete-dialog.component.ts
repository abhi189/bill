import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagingMeter } from './staging-meter.model';
import { StagingMeterPopupService } from './staging-meter-popup.service';
import { StagingMeterService } from './staging-meter.service';

@Component({
    selector: 'jhi-staging-meter-delete-dialog',
    templateUrl: './staging-meter-delete-dialog.component.html'
})
export class StagingMeterDeleteDialogComponent {
    stagingMeter: StagingMeter;

    constructor(
        private stagingMeterService: StagingMeterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stagingMeterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stagingMeterListModification',
                content: 'Deleted an stagingMeter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staging-meter-delete-popup',
    template: ''
})
export class StagingMeterDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingMeterPopupService: StagingMeterPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.stagingMeterPopupService.open(StagingMeterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
