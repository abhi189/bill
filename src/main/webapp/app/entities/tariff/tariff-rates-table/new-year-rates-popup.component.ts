import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-new-year-rates-popup',
    templateUrl: './new-year-rates-popup.component.html'
})
export class NewYearRatesPopupComponent implements OnInit {
    @Output() result = new EventEmitter<Object>();
    year: number;
    cloneWithDecember = false;

    @Input()
    set actualYear(values: any) {
        this.year = values;
    }

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    confirm() {
        this.result.emit({
            confirm: true,
            takeDecember: this.cloneWithDecember
        });
        this.activeModal.close();
    }
}
