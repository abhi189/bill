import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteAccountService } from '.';

@Component({
    selector: 'jhi-site-account-combo-selector-popup',
    template: `
        <div class="modal-header">
            <h4 [hidden]="!monthSelector" class="modal-title">Month Selector</h4>
            <h4 [hidden]="monthSelector" class="modal-title">Charges Selector</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div [hidden]="!monthSelector">
                <div class="combo-selector">
                    <angular4-multiselect
                        [data]="dropdownList"
                        [(ngModel)]="selectedItems"
                        [settings]="dropdownSettings"
                        (onSelect)="($event)"
                        (onDeSelect)="($event)"
                        (onSelectAll)="($event)"
                        (onDeSelectAll)="($event)"
                    ></angular4-multiselect>
                </div>
            </div>
            <div [hidden]="monthSelector">
                <div class="combo-selector">
                    <angular4-multiselect
                        [data]="dropdownList"
                        [(ngModel)]="selectedItems"
                        [settings]="dropdownSettings"
                        (onSelect)="($event)"
                        (onDeSelect)="($event)"
                        (onSelectAll)="($event)"
                        (onDeSelectAll)="($event)"
                    ></angular4-multiselect>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
            <button [hidden]="cDisabled" type="button" (click)="save()" class="btn btn-primary">Save</button>
        </div>
    `
})
export class SiteAccountComboSelectorPopupComponent implements OnInit {
    @Output() comboSelection = new EventEmitter<Object>();

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    monthSelector: boolean;
    defaultTitle: string;
    cDisabled: boolean;

    @Input()
    set isMonthSelector(isMonthSelector: boolean) {
        this.monthSelector = isMonthSelector;
    }

    @Input()
    set dropDown(dropDown: any) {
        this.dropdownList = dropDown;
    }

    @Input()
    set items(items: any) {
        this.selectedItems = items;
    }

    @Input()
    set comboDisabled(comboDisabled: boolean) {
        this.cDisabled = comboDisabled;
    }

    constructor(public activeModal: NgbActiveModal, public siteAccountService: SiteAccountService) {}

    ngOnInit() {
        if (this.monthSelector) {
            this.defaultTitle = 'Select Months';
        } else {
            this.defaultTitle = 'Select Charges';
        }

        this.dropdownSettings = {
            singleSelection: false,
            text: this.defaultTitle,
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: this.cDisabled
        };
    }

    save() {
        this.comboSelection.emit({
            selectedItems: this.selectedItems
        });
        this.activeModal.close();
    }
}
