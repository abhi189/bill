import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AccountService } from '../core/auth/account.service';

import { SERVER_API_URL } from 'app/app.constants';
// const stores = require('../shared/static/stores.json');

@Injectable({ providedIn: 'root' })
export class Dashboard {
    public storesList: Subject<any> = new Subject<any>();
    public selectedStores: Array<any> = [];
    private storesSelected: Subject<any> = new Subject<any>();
    private storesUpdated: Subject<any> = new Subject<any>();
    private openUpdateModal: Subject<any> = new Subject<any>();
    public openUpdateModal$ = this.openUpdateModal.asObservable();
    public storesSelected$ = this.storesSelected.asObservable();
    public storesUpdated$ = this.storesUpdated.asObservable();
    public paymentType: string;

    constructor(private http: HttpClient, private accountService: AccountService) {}

    getStores(user: string): Observable<any> {
        this.getUserAuthentication();
        return new Observable(observer => {
            setTimeout(() => {
                // observer.next(stores);
            }, 500);
        });
        // return this.getStoreBudderflyIds(user).pipe(flatMap(res => this.getAddressFromIds(res)));
    }

    openStoreUpdateModal(open) {
        this.openUpdateModal.next(open);
    }

    clearSelectedStores() {
        this.selectedStores = [];
    }

    setStoresUpdated(store, isComplete) {
        this.storesUpdated.next(store);
        if (isComplete) {
            this.storesUpdated.complete();
        }
    }

    getUserAuthentication() {
        this.accountService.getAuthenticationState().subscribe(res => console.log('User: ', res), err => console.log('User Error: ', err));
    }

    getStoresFromSites(): Observable<any> {
        const url = `${SERVER_API_URL}/sites/api/sites/`;
        return this.http.get(url);
    }

    getStoreBudderflyIds(user: string): Observable<any> {
        const url = `${SERVER_API_URL}/authenticate/api/user-sites-shops/${user}`;
        return this.http.get(url);
    }

    getAddressFromIds(ids: Array<number>): Observable<any> {
        const getCalls = ids.map(storeId => {
            return this.http.get(`${SERVER_API_URL}/sites/sites-by-budderfly-id/${storeId}`);
        });

        return forkJoin(getCalls);
    }

    setSelectedStores(storesList: Array<any>, type) {
        this.selectedStores = [...storesList];
        this.paymentType = type;
        this.storesSelected.next(this.selectedStores);
    }

    removeStore(store: any) {
        this.selectedStores = [...this.selectedStores.filter(s => s.id !== store.id)];
        this.storesSelected.next(this.selectedStores);
    }

    addStore(store: any) {
        this.selectedStores = [...this.selectedStores, store];
        this.storesSelected.next(this.selectedStores);
    }
}
