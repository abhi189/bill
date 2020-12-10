import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RateComponentMappingPopupService } from './rate-component-mapping-popup.service';
import { RateComponentMapping } from './rate-component-mapping.model';

@Component({
    selector: 'jhi-rate-component-mapping-edit-dialog',
    templateUrl: './rate-component-mapping-edit-dialog.component.html'
})
export class RateComponentMappingEditDialogComponent {
    rateComponentMapping: RateComponentMapping;
    constructor(public activeModal: NgbActiveModal, public router: Router) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmEdit(id: number) {
        this.activeModal.dismiss('ok');
        setTimeout(() => {
            this.router.navigate(['/', { outlets: { popup: 'rate-component-mapping/' + id + '/edit' } }], {
                queryParamsHandling: 'preserve'
            });
        }, 0);
    }
}

@Component({
    selector: 'jhi-rate-component-mapping-edit-popup',
    template: ''
})
export class RateComponentMappingEditPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateComponentMappingPopupService: RateComponentMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.rateComponentMappingPopupService.open(RateComponentMappingEditDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
