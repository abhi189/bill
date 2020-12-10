import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExcludedRate } from './excluded-rate.model';
import { ExcludedRatePopupService } from './excluded-rate-popup.service';
import { ExcludedRateService } from './excluded-rate.service';

@Component({
    selector: 'jhi-excluded-rate-delete-dialog',
    templateUrl: './excluded-rate-delete-dialog.component.html'
})
export class ExcludedRateDeleteDialogComponent {
    excludedRate: ExcludedRate;

    constructor(
        private excludedRateService: ExcludedRateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.excludedRateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'excludedRateListModification',
                content: 'Deleted an excludedRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-excluded-rate-delete-popup',
    template: ''
})
export class ExcludedRateDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private excludedRatePopupService: ExcludedRatePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.excludedRatePopupService.open(ExcludedRateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
