import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AmeAlgorithm } from '../../shared/model/ame.model';
import { SiteAccountService } from '.';

@Component({
    selector: 'jhi-site-account-ame-calculation-popup',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">AME Calculation Options</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <label for="selectStartDate">Start Date</label>
            <div class="form-row form-group">
                <div class="col">
                    <select class="form-control" id="selectMonth" [(ngModel)]="selectedMonth">
                        <option *ngFor="let month of monthOptions; let i = index" [ngValue]="i">{{ month }}</option>
                    </select>
                </div>
                <div class="col">
                    <select class="form-control" id="selectYear" [(ngModel)]="selectedYear">
                        <option *ngFor="let year of yearOptions">{{ year }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="selectAlgorithm">Algorithm</label>
                <select class="form-control" id="selectAlgorithm" [(ngModel)]="selectedAlgorithm">
                    <option *ngFor="let algorithm of algorithmOptions">{{ algorithm }}</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
            <button type="button" (click)="defineAmeCalculationOptions()" class="btn btn-primary">Calculate AME</button>
        </div>
    `
})
export class SiteAccountAmeCalculationPopupComponent {
    @Output() ameCalculationOptions = new EventEmitter<Object>();

    @Input() yearOptions;
    @Input() monthOptions;
    @Input() algorithmOptions;

    selectedAlgorithm: AmeAlgorithm;
    selectedMonth: string;
    selectedYear: number;

    constructor(public activeModal: NgbActiveModal, public siteAccountService: SiteAccountService) {}

    defineAmeCalculationOptions() {
        this.ameCalculationOptions.emit({
            selectedAlgorithm: this.selectedAlgorithm,
            selectedMonth: this.selectedMonth,
            selectedYear: this.selectedYear
        });
        this.activeModal.close();
    }
}
