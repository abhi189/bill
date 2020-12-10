import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagingCharge } from './staging-charge.model';
import { StagingChargePopupService } from './staging-charge-popup.service';
import { StagingChargeService } from './staging-charge.service';

@Component({
    selector: 'jhi-staging-charge-delete-dialog',
    templateUrl: './staging-charge-delete-dialog.component.html'
})
export class StagingChargeDeleteDialogComponent {
    stagingCharge: StagingCharge;

    constructor(
        private stagingChargeService: StagingChargeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stagingChargeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stagingChargeListModification',
                content: 'Deleted an stagingCharge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staging-charge-delete-popup',
    template: ''
})
export class StagingChargeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingChargePopupService: StagingChargePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.stagingChargePopupService.open(StagingChargeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
