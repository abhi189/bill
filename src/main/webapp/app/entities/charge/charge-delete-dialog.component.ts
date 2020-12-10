import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ChargePopupService } from './charge-popup.service';
import { ChargeService } from './charge.service';

@Component({
    selector: 'jhi-charge-delete-dialog',
    templateUrl: './charge-delete-dialog.component.html'
})
export class ChargeDeleteDialogComponent {
    charge: Charge;

    constructor(private chargeService: ChargeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chargeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chargeListModification',
                content: 'Deleted an charge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-charge-delete-popup',
    template: ''
})
export class ChargeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private chargePopupService: ChargePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.chargePopupService.open(ChargeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
