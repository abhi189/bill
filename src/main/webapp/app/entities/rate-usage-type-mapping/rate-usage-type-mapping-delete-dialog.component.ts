import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingPopupService } from './rate-usage-type-mapping-popup.service';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';

@Component({
    selector: 'jhi-rate-usage-type-mapping-delete-dialog',
    templateUrl: './rate-usage-type-mapping-delete-dialog.component.html'
})
export class RateUsageTypeMappingDeleteDialogComponent {
    rateUsageTypeMapping: RateUsageTypeMapping;

    constructor(
        private rateUsageTypeMappingService: RateUsageTypeMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateUsageTypeMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateUsageTypeMappingListModification',
                content: 'Deleted an rateUsageTypeMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-usage-type-mapping-delete-popup',
    template: ''
})
export class RateUsageTypeMappingDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateUsageTypeMappingPopupService: RateUsageTypeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateUsageTypeMappingPopupService.open(RateUsageTypeMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
