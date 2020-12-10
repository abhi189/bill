import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discount } from './discount.model';
import { DiscountPopupService } from './discount-popup.service';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-duplicate-dialog',
    templateUrl: './discount-duplicate-dialog.component.html'
})
export class DiscountDuplicateDialogComponent {
    discount: Discount;

    constructor(private discountService: DiscountService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDuplicate(id: number) {
        this.discountService.duplicate(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discountListModification',
                content: 'Duplicated a discount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discount-duplicate-popup',
    template: ''
})
export class DiscountDuplicatePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private discountPopupService: DiscountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.discountPopupService.open(DiscountDuplicateDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
