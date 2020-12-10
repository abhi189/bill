import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class AmeInvoicesService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/invoices';

    constructor(private http: HttpClient) {}

    getAllInvoicesByAme(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }

    findInvoices(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}`, { params: req, observe: 'response' });
    }

    getFilterOptions(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}/filter-options`);
    }
}
