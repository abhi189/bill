import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event, PRIMARY_OUTLET, RoutesRecognized, ActivationEnd } from '@angular/router';
import { map, mergeMap, buffer, pluck } from 'rxjs/internal/operators';
import { Dashboard } from './dashboard.service';
import { AccountService, UserService, User } from 'app/core';
import { MainService } from '../layouts/main/main.service';
import { BehaviorSubject } from 'rxjs';
import { DashboardListComponent } from './components/list/list.component';
import { DashboardInvoiceComponent } from './components/invoices/invoice.component';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public sideBarVisible: boolean;
    public showSuccessModal: boolean;
    // public breadcrumbs$: Observable<any>;
    public breadcrumbs: Array<any> = [];
    public showStoresList: boolean;
    public showInvoiceList: boolean;
    public storesUpdated = [];
    public layoutOptions: any;
    public enableCloseUpdate: boolean;
    public storeSelected: string;
    show2Clicked: boolean;
    showMe: boolean;
    budderflyId: string;

    constructor(private accountService: AccountService, private mainService: MainService, private dashboard: Dashboard) {
        const that = this;
        this.layoutOptions = this.mainService.layoutOptions;
    }

    ngOnInit() {
        this.showSuccessModal = false;
        this.showStoresList = true;
        this.showInvoiceList = true;
        this.sideBarVisible = true;
    }

    ngOnDestroy() {
        this.showStoresList = false;
        this.sideBarVisible = false;
        this.showInvoiceList = false;
    }

    handleToggleSideBar() {
        this.sideBarVisible = !this.sideBarVisible;
    }

    handleSiteClick($event) {
        this.dashboard.setInvoiceSelected($event);
        this.showStoresList = false;
        this.showInvoiceList = true;
    }

    showStoresListTable() {
        this.showStoresList = true;
        this.showInvoiceList = false;
    }
}
