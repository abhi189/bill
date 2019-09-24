import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dashboard } from '../../dashboard.service';
import { InvoicesComponent } from 'app/invoices/invoices.component';

@Component({
    selector: 'jhi-stores-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class DashboardListComponent implements OnInit {
    @Output() onSiteClick = new EventEmitter<string>();
    @Input() layoutOptions;
    public storesSelected: Array<any>;
    public storeList: Array<any>;
    public filters: any = {};
    public budderflyId: string;
    // showStoresList: boolean = true;

    constructor(private dashboard: Dashboard, private router: Router) {
        this.dashboard.getStoresFromSites().subscribe(
            res => {
                this.constructStores(res);
            },
            err => console.log('Error fetching stores. ', err)
        );

        this.dashboard.storesSelected$.subscribe(res => {
            this.storesSelected = [...res];
        });
    }
    ngOnInit() {
        this.storesSelected = [...this.dashboard.selectedStores];
    }

    constructStores(stores): void {
        stores = stores.map(store => {
            const { budderflyId, address, balance, dueDate, amountDue } = store;

            return {
                budderflyId,
                address,
                balance,
                dueDate,
                amountDue
            };
        });
        const finalStores = this.enableSlected(stores);
        this.storeList = finalStores;
    }

    handleSiteClick(budderflyId) {
        console.log('Hi ' + budderflyId);
        this.onSiteClick.emit(budderflyId);
        // this.showStoresList = false;
    }

    setStoreSelected(store): boolean {
        if (this.storesSelected.length) {
            return this._getStoreSelectedIndex(store) > -1 ? true : false;
        }
        return false;
    }

    enableSlected(stores) {
        if (!this.storesSelected.length) {
            return stores;
        }

        return stores.map(store => {
            let storeInner = {
                ...store,
                checkedManually: false
            };

            for (let i = 0, len = this.storesSelected.length; i < len; i += 1) {
                if (this.setStoreSelected(store)) {
                    storeInner = {
                        ...store,
                        checkedManually: true
                    };
                    break;
                }
            }
            return storeInner;
        });
    }

    private _getStoreSelectedIndex(store): number {
        if (!this.storesSelected.length) {
            return -1;
        }
        let storeSelectedIndex = -1,
            i = 0;
        const len = this.storesSelected.length;

        for (; i < len; i += 1) {
            const selectedStore = this.storesSelected[i];

            if (store.budderflyId === selectedStore.budderflyId) {
                storeSelectedIndex = i;
                break;
            }
        }
        return storeSelectedIndex;
    }
}
