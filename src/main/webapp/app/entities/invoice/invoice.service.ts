import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL, ACCOUNTING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { createRequestOption } from '../../shared';
import { Charge } from '../charge';

export type EntityResponseType = HttpResponse<Invoice>;

@Injectable()
export class InvoiceService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/invoices';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/invoices';
    private accountingResourceUrl = ACCOUNTING_SERVER_API_URL + 'api/add-Utility-Invoice';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(invoice: Invoice): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http
            .post<Invoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoice: Invoice): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http
            .put<Invoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Invoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Invoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Invoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Invoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Invoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Invoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Invoice[]>) => this.convertArrayResponse(res));
    }

    export(invoice: Invoice, params?: any): Observable<HttpResponse<String>> {
        const options = createRequestOption(params);
        return this.http.post<String>(this.accountingResourceUrl, invoice, { params: options, observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Invoice = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Invoice[]>): HttpResponse<Invoice[]> {
        const jsonResponse: Invoice[] = res.body;
        const body: Invoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Invoice.
     */
    private convertItemFromServer(invoice: Invoice): Invoice {
        const copy: Invoice = Object.assign({}, invoice);
        copy.intervalStart = this.dateUtils.convertLocalDateFromServer(invoice.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateFromServer(invoice.intervalEnd);
        return copy;
    }

    /**
     * Convert a Invoice to a JSON which can be sent to the server.
     */
    convert(invoice: Invoice): Invoice {
        const copy: Invoice = Object.assign({}, invoice);
        copy.intervalStart = this.dateUtils.convertLocalDateToServer(invoice.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateToServer(invoice.intervalEnd);
        return copy;
    }
}
