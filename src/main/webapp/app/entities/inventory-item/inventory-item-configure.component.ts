import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'jhi-inventory-item-configure',
    templateUrl: './inventory-item-configure.component.html'
})
export class InventoryItemConfigureComponent implements OnInit, OnDestroy {
    inventoryItem = {
        id: '123',
        name: 'Sample',
        externalId: '345'
    };
    constructor() {}
    activeTabString: string;

    ngOnInit() {
        this.activeTabString = 'tabDetails';
        this.inventoryItem = {
            id: '123',
            name: 'Sample',
            externalId: '345'
        };
    }

    beforeTabChange(event) {
        console.log('event: ', event);
    }
    save() {}

    ngOnDestroy() {
        console.log('destroyed');
    }
}
