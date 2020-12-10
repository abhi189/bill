import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateChargeMapping } from './rate-charge-mapping.model';
import { RateChargeMappingPopupService } from './rate-charge-mapping-popup.service';
import { RateChargeMappingService } from './rate-charge-mapping.service';

@Component({
    selector: 'jhi-rate-charge-mapping-delete-dialog',
    templateUrl: './rate-charge-mapping-delete-dialog.component.html'
})
export class RateChargeMappingDeleteDialogComponent {
    rateChargeMapping: RateChargeMapping;

    constructor(
        private rateChargeMappingService: RateChargeMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateChargeMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateChargeMappingListModification',
                content: 'Deleted an rateChargeMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-charge-mapping-delete-popup',
    template: ''
})
export class RateChargeMappingDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateChargeMappingPopupService: RateChargeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateChargeMappingPopupService.open(RateChargeMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
