import { Component, OnInit, Input } from '@angular/core';
import { Discount } from '..';
import { DiscountService } from '../discount.service';

@Component({
    selector: 'jhi-discount-late-charges',
    templateUrl: './discount-late-charges.component.html',
    styles: [
        `
            .inline-input {
                min-width: 70px;
                max-width: 85px;
            }
        `
    ]
})
export class DiscountLateChargesComponent implements OnInit {
    @Input() discount: Discount;
    originalDiscount: Discount;

    constructor(private discountService: DiscountService) {}

    ngOnInit() {
        if (this.discount && this.discount.lateCharges == null) {
            this.discount.lateCharges = false;
        }
        this.originalDiscount = Object.assign({}, this.discount);
    }

    saveDiscount() {
        this.discountService.update(this.discount).subscribe(discountResponse => {
            this.discount = discountResponse.body;
            this.originalDiscount = Object.assign({}, this.discount);
        });
    }

    resetDiscount() {
        this.discount = Object.assign({}, this.originalDiscount);
    }

    previousState() {
        window.history.back();
    }
}
