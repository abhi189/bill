import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateComponentMapping } from './rate-component-mapping.model';
import { RateComponentMappingPopupService } from './rate-component-mapping-popup.service';
import { RateComponentMappingService } from './rate-component-mapping.service';

@Component({
    selector: 'jhi-rate-component-mapping-delete-dialog',
    templateUrl: './rate-component-mapping-delete-dialog.component.html'
})
export class RateComponentMappingDeleteDialogComponent {
    rateComponentMapping: RateComponentMapping;

    constructor(
        private rateComponentMappingService: RateComponentMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateComponentMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rateComponentMappingListModification',
                content: 'Deleted an rateComponentMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-component-mapping-delete-popup',
    template: ''
})
export class RateComponentMappingDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateComponentMappingPopupService: RateComponentMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateComponentMappingPopupService.open(RateComponentMappingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
