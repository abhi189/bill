import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dashboard } from '../../dashboard.service';

@Component({
    selector: 'jhi-stores-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class DashboardListComponent implements OnInit {
    @Output() onAutoPayClick = new EventEmitter();
    public storesSelected: Array<any>;
    public storeList: Array<any>;
    public filters: any = {};

    constructor(private dashboard: Dashboard, private router: Router) {
        // this.dashboard.getStores('sample').subscribe(res => {
        //     this.storeList = this.enableSlected(res);
        // });
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
            const { id, storeNumber, budderflyId, zip, state, city, address, paymentType } = store;

            return {
                id: storeNumber,
                storeId: id,
                budderflyId,
                autoPayEnabled: paymentType && paymentType === 'ETF',
                zip,
                state,
                city,
                address
            };
        });
        const finalStores = this.enableSlected(stores);
        this.storeList = finalStores;
    }

    handleStoreClick(store) {
        if (store && this.storesSelected.length) {
            const storeIndex = this._getStoreSelectedIndex(store);
            if (storeIndex > -1) {
                this.storesSelected.splice(storeIndex, 1);
                return;
            }
        }
        this.storesSelected = [...this.storesSelected, store];
        this.setStoreSelected(store);
    }

    handleSelectAllClick() {
        if (this.filters.selectAll) {
            this.filters = {};
            this.filters.selectAll = true;
            this.handleFiltersApplied('all');
            this.storesSelected = this.storeList.filter(s => s.checkedManually);
            return;
        }
        this.storesSelected = [];
        this.handleFiltersApplied();
    }

    handleSelectAllDisabledClick() {
        if (this.filters.selectDisabled) {
            this.filters = {};
            this.filters.selectDisabled = true;
            this.handleFiltersApplied('disabled');
            return;
        }
        this.handleFiltersApplied();
    }

    handleSelectAllEnabledClick() {
        if (this.filters.selectEnabled) {
            this.filters = {};
            this.filters.selectEnabled = true;
            this.handleFiltersApplied('enabled');
            return;
        }
        this.handleFiltersApplied();
    }

    handleFiltersApplied(type = '') {
        this.storeList = this.storeList.map(store => {
            const { autoPayEnabled } = store;
            const enable =
                type === 'all' ? true : autoPayEnabled && type === 'enabled' ? true : !autoPayEnabled && type === 'disabled' ? true : false;
            if (autoPayEnabled) {
                return {
                    ...store
                };
            }
            return {
                ...store,
                checkedManually: enable
            };
        });
    }

    getStoreStores(username: string) {
        this.dashboard.getStores(username).subscribe(
            res => {
                console.log('Res: ', res);
            },
            err => {
                console.log('Err: ', err);
            }
        );
    }

    handleAutoPayClick(type) {
        if (this.storeList.filter(s => s.checkedManually).length) {
            this.dashboard.setSelectedStores(this.storeList.filter(s => s.checkedManually), type);
            this.onAutoPayClick.next('showForm');
        }
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

    handlePaymentChange(event, store) {
        if (store && this.storesSelected.length) {
            const storeIndex = this._getStoreSelectedIndex(store);
            if (storeIndex > -1) {
                this.storesSelected.splice(storeIndex, 1);
                return;
            }
        }
        if (store.checkedManually) {
            this.storesSelected = [...this.storesSelected, store];
        }
    }

    setStoreSelected(store): boolean {
        if (this.storesSelected.length) {
            return this._getStoreSelectedIndex(store) > -1 ? true : false;
        }
        return false;
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
