import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Dashboard } from '../../dashboard.service';

@Component({
    selector: 'jhi-dashboard-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class DashboardPaymentsComponent implements OnInit {
    @Output() onBackClick = new EventEmitter();
    public showSelectedStoresError: boolean;
    public selectedStores: Array<any>;
    public paymentType: string;
    public showRoutingImage: boolean;

    constructor(private router: Router, private dashboard: Dashboard) {}

    ngOnInit() {
        this.selectedStores = [];
        this.showRoutingImage = false;
        this.dashboard.storesSelected$.subscribe(
            res => {
                this.selectedStores = res;
                this.showSelectedStoresError = false;
                if (!res.length) {
                    this.showSelectedStoresError = true;
                }
            },
            err => console.log(err)
        );
        if (this.dashboard.paymentType && !this.dashboard.selectedStores) {
            this.showSelectedStoresError = true;
        } else {
            this.selectedStores = this.dashboard.selectedStores;
            this.paymentType = this.dashboard.paymentType;
        }
    }

    removeStore(store: any) {
        this.dashboard.removeStore(store);
    }

    handleRoutingImgOpen() {
        this.showRoutingImage = true;
    }

    closeRoutingImgModal() {
        this.showRoutingImage = false;
    }

    handleBackClick() {
        this.onBackClick.next();
    }
}
