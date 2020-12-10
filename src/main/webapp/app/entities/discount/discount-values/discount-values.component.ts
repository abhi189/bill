import { Component, Input, OnInit } from '@angular/core';
import { Discount } from '../discount.model';

@Component({
    selector: 'jhi-discount-values',
    templateUrl: './discount-values.component.html',
    styles: []
})
export class DiscountValuesComponent implements OnInit {
    @Input() discount: Discount;

    constructor() {}

    ngOnInit() {}

    previousState() {
        window.history.back();
    }
}
