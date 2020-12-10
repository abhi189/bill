import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tax } from './tax.model';
import { TaxPopupService } from './tax-popup.service';
import { TaxService } from './tax.service';

@Component({
    selector: 'jhi-tax-delete-dialog',
    templateUrl: './tax-delete-dialog.component.html'
})
export class TaxDeleteDialogComponent {
    tax: Tax;

    constructor(private taxService: TaxService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taxListModification',
                content: 'Deleted an tax'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tax-delete-popup',
    template: ''
})
export class TaxDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private taxPopupService: TaxPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.taxPopupService.open(TaxDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
