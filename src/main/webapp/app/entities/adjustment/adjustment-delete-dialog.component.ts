import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Adjustment } from './adjustment.model';
import { AdjustmentPopupService } from './adjustment-popup.service';
import { AdjustmentService } from './adjustment.service';

@Component({
    selector: 'jhi-adjustment-delete-dialog',
    templateUrl: './adjustment-delete-dialog.component.html'
})
export class AdjustmentDeleteDialogComponent {
    adjustment: Adjustment;

    constructor(private adjustmentService: AdjustmentService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.adjustmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'adjustmentListModification',
                content: 'Deleted an adjustment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-adjustment-delete-popup',
    template: ''
})
export class AdjustmentDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private adjustmentPopupService: AdjustmentPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.adjustmentPopupService.open(AdjustmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
