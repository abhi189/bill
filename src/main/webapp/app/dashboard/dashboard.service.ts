import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, forkJoin } from 'rxjs';

import { AccountService } from '../core/auth/account.service';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class Dashboard {
    public storesList: Subject<any> = new Subject<any>();
    public selectedStores: Array<any> = [];
    private storesSelected: Subject<any> = new Subject<any>();
    public storesSelected$ = this.storesSelected.asObservable();
    public invoiceList: Subject<any> = new Subject<any>();
    public selectedInvoices: Array<any> = [];
    private invoiceSelected: Subject<any> = new Subject<any>();
    public invoiceSelected$ = this.invoiceSelected.asObservable();

    private getInvoice: Subject<any> = new Subject<any>();
    public getInvoice$ = this.getInvoice.asObservable();
    budderflyId: string;

    constructor(private http: HttpClient, private accountService: AccountService) {}

    getStores(user: string): Observable<any> {
        this.getUserAuthentication();
        return new Observable(observer => {
            setTimeout(() => {}, 500);
        });
    }

    getUserAuthentication() {
        this.accountService.getAuthenticationState().subscribe(res => console.log('User: ', res), err => console.log('User Error: ', err));
    }

    getStoresFromSites(): Observable<any> {
        const url = `${SERVER_API_URL}/invoice/api/budderfly-invoices/by-budderfly-id/by-previous-date-and-balance`;
        return this.http.get(url);
    }

    getInvoiceFromBudderflyId(budderflyId: String): Observable<any> {
        const invoiceurl = `${SERVER_API_URL}/invoice/api/budderfly-invoices/by-status-and-dates/${budderflyId}`;
        return this.http.get(invoiceurl);
    }

    setInvoiceSelected(budderflyId: string) {
        this.budderflyId = budderflyId;
        this.invoiceSelected.next(budderflyId);
    }

    setSelectedInvoices(invoiceList: Array<any>) {
        this.selectedInvoices = [...invoiceList];
        this.getInvoice.next(this.selectedInvoices);
    }
}
