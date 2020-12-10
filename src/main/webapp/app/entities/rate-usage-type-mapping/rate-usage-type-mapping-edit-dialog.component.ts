import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RateUsageTypeMappingPopupService } from './rate-usage-type-mapping-popup.service';
import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';

@Component({
    selector: 'jhi-rate-usage-type-mapping-edit-dialog',
    templateUrl: './rate-usage-type-mapping-edit-dialog.component.html'
})
export class RateUsageTypeMappingEditDialogComponent {
    rateUsageTypeMapping: RateUsageTypeMapping;
    constructor(public activeModal: NgbActiveModal, public router: Router) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmEdit(id: number) {
        this.activeModal.dismiss('ok');
        setTimeout(() => {
            this.router.navigate(['/', { outlets: { popup: 'rate-usage-type-mapping/' + id + '/edit' } }], {
                queryParamsHandling: 'preserve'
            });
        }, 0);
    }
}

@Component({
    selector: 'jhi-rate-usage-type-mapping-edit-popup',
    template: ''
})
export class RateUsageTypeMappingEditPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateUsageTypeMappingPopupService: RateUsageTypeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateUsageTypeMappingPopupService.open(RateUsageTypeMappingEditDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
