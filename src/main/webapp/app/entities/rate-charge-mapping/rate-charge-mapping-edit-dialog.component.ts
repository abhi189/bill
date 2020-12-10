import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RateChargeMappingPopupService } from './rate-charge-mapping-popup.service';
import { RateChargeMapping } from './rate-charge-mapping.model';

@Component({
    selector: 'jhi-rate-charge-mapping-edit-dialog',
    templateUrl: './rate-charge-mapping-edit-dialog.component.html'
})
export class RateChargeMappingEditDialogComponent {
    rateChargeMapping: RateChargeMapping;
    constructor(public activeModal: NgbActiveModal, public router: Router) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmEdit(id: number) {
        this.activeModal.dismiss('ok');
        setTimeout(() => {
            this.router.navigate(['/', { outlets: { popup: 'rate-charge-mapping/' + id + '/edit' } }], { queryParamsHandling: 'preserve' });
        }, 0);
    }
}

@Component({
    selector: 'jhi-rate-charge-mapping-edit-popup',
    template: ''
})
export class RateChargeMappingEditPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateChargeMappingPopupService: RateChargeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateChargeMappingPopupService.open(RateChargeMappingEditDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
