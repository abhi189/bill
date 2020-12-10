import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-tariff-rates-months-popup',
    templateUrl: './tariff-rates-months-popup.component.html'
})
export class TariffRatesMonthsPopupComponent implements OnInit {
    @Output() valueToAllMonth = new EventEmitter<Object>();

    monthValue: number;
    cDisabled: boolean;

    @Input()
    set values(values: any) {
        this.monthValue = values;
    }

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    save() {
        this.valueToAllMonth.emit({
            monthValue: this.monthValue
        });
        this.activeModal.close();
    }
}
