import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discount } from './discount.model';
import { DiscountPopupService } from './discount-popup.service';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-delete-dialog',
    templateUrl: './discount-delete-dialog.component.html'
})
export class DiscountDeleteDialogComponent {
    discount: Discount;

    constructor(private discountService: DiscountService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discountListModification',
                content: 'Deleted an discount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discount-delete-popup',
    template: ''
})
export class DiscountDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private discountPopupService: DiscountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.discountPopupService.open(DiscountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
