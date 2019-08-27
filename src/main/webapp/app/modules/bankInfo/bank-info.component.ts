import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BankingInfo } from './bank-info.service';
import { AccountService } from '../../core/auth/account.service';
import { AuthServerProvider } from '../../core/auth/auth-jwt.service';
import { Dashboard } from '../../dashboard/dashboard.service';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'jhi-bank-info-component',
    templateUrl: './bank-info.component.html',
    styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {
    public states: any = [];
    public bankInfo: any = {};
    public storeError: string;
    public bankDataError: string;
    public storeUpdateId: any;
    public showStoreIdSuccess: boolean;
    public storeUpdateTimeout: any;
    private updatedStores: number;
    private searchStore: Subject<string> = new Subject();
    @Input() showLogout: boolean;
    @Input() showLogo: boolean;
    @Input() showBoxLayout: boolean;
    @Input() showStore: boolean;
    @Output() openRoutingImg = new EventEmitter();
    @Output() openSuccessModal = new EventEmitter();

    constructor(
        private accountService: AccountService,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private bankInfoService: BankingInfo,
        private dashboard: Dashboard
    ) {
        this.bankInfoService.storeUpdate$.subscribe(res => {
            this.handleStoreUpdate(res);
        });
    }

    ngOnInit() {
        this.states = [
            'Alabama',
            'Alaska',
            'American Samoa',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'District of Columbia',
            'Florida',
            'Georgia',
            'Guam',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Minor Outlying Islands',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Northern Mariana Islands',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Puerto Rico',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'U.S. Virgin Islands',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
        ];
        this.bankInfoService.constructRoutingById();
        this.searchStore.pipe(debounceTime(500)).subscribe(searchTextValue => {
            this.getStoreInfo(searchTextValue);
        });
        this.updatedStores = 1;
    }

    onChangeState(state: string) {
        this.bankInfo.state = state;
    }

    submitBankInfo() {
        if (this.bankInfo.accountNumber !== this.bankInfo.accountNumberVerify) {
            return;
        }

        const stores = this.dashboard.selectedStores;
        const data = {
            accountingNumber: this.bankInfo.accountNumber,
            routingNumber: this.bankInfo.routingNumber,
            name: this.bankInfo.accountName,
            city: this.bankInfo.city,
            zip: this.bankInfo.zipCode,
            state: this.bankInfo.state,
            address: this.bankInfo.accountAddressOne
        };
        const storesRequests = stores.map(store => {
            return {
                ...data,
                id: store.storeId,
                budderflyId: store.budderflyId
            };
        });

        this.dashboard.openStoreUpdateModal(true);

        this.bankInfoService.updateAllAutoPayStores(storesRequests).subscribe(
            res => {
                const store = { status: 'success' };
                this.dashboard.setStoresUpdated(store, true);
            },
            err => {
                const store = { status: 'error' };
                this.dashboard.setStoresUpdated(store, true);
            }
        );

        // for (let i = 0, len = storesRequests.length; i < len; i += 1) {
        //     const request = storesRequests[i];

        //     this.bankInfoService.updateStoreAutoPay(request).subscribe(
        //         res => {
        //             if (res && res.status === 200) {
        //                 this.storeUpdateId = undefined;
        //                 this.bankInfoService.updateStore({ storeId: storesRequests[i].budderflyId, status: 'success', apiIndex: i + 1 });
        //             } else {
        //                 this.storeUpdateId = undefined;
        //                 this.bankInfoService.updateStore({ storeId: storesRequests[i].budderflyId, status: 'failed', apiIndex: i + 1 });
        //             }
        //         },
        //         err => {
        //             this.storeUpdateId = undefined;
        //             this.bankInfoService.updateStore({ storeId: storesRequests[i].budderflyId, status: 'failed', apiIndex: i + 1 });
        //         }
        //     );
        // }
    }

    handleStoreUpdate({ storeId, status, apiIndex }) {
        const store = { storeId, status, apiIndex };

        setTimeout(() => {
            this.storeUpdateId = storeId;
            switch (status) {
                case 'failed':
                    this.showStoreIdSuccess = false;
                    break;
                case 'success':
                    this.showStoreIdSuccess = true;
                    break;
                default:
                    break;
            }
            const isComplete = this.dashboard.selectedStores.length === this.updatedStores++;
            this.dashboard.setStoresUpdated(store, isComplete);
        }, 1000 * apiIndex);
    }

    handleRoutingNumberChange(routingNumber: string) {
        this.bankDataError = undefined;
        const bankData = this.bankInfoService.findRoutingNumberById(routingNumber);

        if (bankData && Object.keys(bankData).length) {
            this.bankInfo.bank = bankData.customerName;
        } else {
            this.bankInfo.bank = undefined;
            this.bankDataError = 'Routing Number Not Found.';
        }
    }

    resetBankForm() {
        this.bankInfo = {};
    }

    handleRoutingImgClick() {
        this.openRoutingImg.next();
    }

    handleStoreNumberChange(siteNo: string) {
        this.searchStore.next(siteNo);
    }

    getStoreInfo(siteNo: string) {
        this.bankInfoService.getStoreInfoById(siteNo).subscribe(
            res => {
                this.bankInfo.siteAddress = res.Address;
            },
            err => {
                this.storeError = 'Store Not Found.';
                console.log(err);
            }
        );
    }

    debounceSearch(fn: any, time = 300) {
        return function() {
            let fnCalled = false;
            const context = this;
            const args = Array.prototype.slice.call(arguments);
            if (!time) {
                fn.apply(context, args);
            } else {
                if (!fnCalled) {
                    setTimeout(() => {
                        fn.apply(context, args);
                        fnCalled = true;
                    }, time);
                }
            }
        };
    }

    logout() {
        if (this.accountService.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => {
                this.accountService.authenticate(null);
                this.router.navigate(['']);
            });
        } else {
            this.accountService.authenticate(null);
            this.router.navigate(['']);
        }
    }
}
