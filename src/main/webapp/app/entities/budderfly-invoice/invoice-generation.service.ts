import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_GENERATION_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

@Injectable()
export class InvoiceGenerationService {
    private updateInvoiceFromDetailUrl = INVOICE_GENERATION_API_URL + 'api/update-invoice-from-detail';
    private refreshAccountsUrl = INVOICE_GENERATION_API_URL + 'api/accounts-receivable';
    private refreshPerformancesUrl = INVOICE_GENERATION_API_URL + 'api/performances';
    private refreshChargesUrl = INVOICE_GENERATION_API_URL + 'api/generate-charges-for-invoice';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    updateInvoiceFromDetail(invoiceNumber: string): Observable<HttpResponse<any>> {
        return this.http.post(`${this.updateInvoiceFromDetailUrl}/${invoiceNumber}`, null, { observe: 'response' });
    }

    refreshAccountsReceivables(invoiceNumber: string): Observable<void> {
        return this.http.post<void>(`${this.refreshAccountsUrl}/${invoiceNumber}`, { observe: 'response' });
    }

    refreshPerformances(invoiceNumber: string): Observable<void> {
        return this.http.post<void>(`${this.refreshPerformancesUrl}/${invoiceNumber}`, { observe: 'response' });
    }

    refreshCharges(invoiceNumber: string): Observable<any> {
        return this.http.post<void>(`${this.refreshChargesUrl}/budderfly-invoice-number/${invoiceNumber}`, { observe: 'response' });
    }
}
