import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-new-year-rates-message-popup',
    templateUrl: './new-year-rates-message-popup.component.html'
})
export class NewYearRatesMessagePopupComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}
}
