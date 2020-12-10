import { Component, OnInit, Input } from '@angular/core';
import { Discount } from '..';
import { DiscountService } from '../discount.service';

@Component({
    selector: 'jhi-discount-shared-savings',
    templateUrl: './discount-shared-savings.component.html',
    styles: [
        `
            .inline-input {
                min-width: 70px;
                max-width: 85px;
            }
        `
    ]
})
export class DiscountSharedSavingsComponent implements OnInit {
    @Input() discount: Discount;
    originalDiscount: Discount;

    constructor(private discountService: DiscountService) {}

    ngOnInit() {
        if (this.discount && this.discount.sharedSavings == null) {
            this.discount.sharedSavings = false;
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
