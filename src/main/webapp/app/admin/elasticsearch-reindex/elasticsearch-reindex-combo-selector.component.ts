import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-site-account-combo-selector',
    template: `
        <div class="combo-selector">
            <angular4-multiselect
                [data]="dropdownList"
                [(ngModel)]="selectedItems"
                [settings]="dropdownSettings"
                (onSelect)="onItemSelect($event)"
                (onDeSelect)="onItemDeSelect($event)"
                (onSelectAll)="($event)"
                (onDeSelectAll)="($event)"
                (onSelectAll)="onItemSelectAll($event)"
                (onDeSelectAll)="onItemDeSelectAll($event)"
            ></angular4-multiselect>
        </div>
    `
})
export class ElasticsearchReindexComboSelectorComponent implements OnInit {
    @Output() comboSelection = new EventEmitter<Object>();

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    defaultTitle: string;
    cDisabled: boolean;

    constructor() {}

    ngOnInit() {
        // list of enabled services that support elasticsearch reindex.
        this.dropdownList = [
            { id: 1, itemName: 'billing' },
            { id: 2, itemName: 'invoice' },
            { id: 3, itemName: 'sites' },
            { id: 4, itemName: 'rate.repository' },
            { id: 5, itemName: 'inventory' }
        ];

        // default to ALL services
        this.selectedItems = [
            { id: 1, itemName: 'billing' },
            { id: 2, itemName: 'invoice' },
            { id: 3, itemName: 'sites' },
            { id: 4, itemName: 'rate.repository' },
            { id: 5, itemName: 'inventory' }
        ];

        this.defaultTitle = 'Select Services';

        this.dropdownSettings = {
            singleSelection: false,
            text: this.defaultTitle,
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            disabled: false
        };

        this.sendSelectedItems();
    }

    onItemSelect(item: any) {
        this.sendSelectedItems();
    }

    onItemDeSelect(item: any) {
        this.sendSelectedItems();
    }

    onItemSelectAll(items: any) {
        this.sendSelectedItems();
    }

    onItemDeSelectAll(items: any) {
        this.sendSelectedItems();
    }

    sendSelectedItems() {
        this.comboSelection.emit({
            selectedItems: this.selectedItems
        });
    }
}
