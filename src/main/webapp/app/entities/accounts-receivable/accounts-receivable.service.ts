import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, INVOICE_GENERATION_API_URL } from '../../app.constants';

import { AccountsReceivable } from './accounts-receivable.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AccountsReceivable>;

@Injectable()
export class AccountsReceivableService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/accounts-receivables';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/accounts-receivables';
    private resourceUrlByInvoiceId = INVOICE_SERVER_API_URL + 'api/accounts-receivables-by-invoice-id';
    private refreshAccountsUrl = INVOICE_GENERATION_API_URL + 'api/accounts-receivable';
    constructor(private http: HttpClient) {}

    create(accountsReceivable: AccountsReceivable): Observable<EntityResponseType> {
        const copy = this.convert(accountsReceivable);
        return this.http
            .post<AccountsReceivable>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(accountsReceivable: AccountsReceivable): Observable<EntityResponseType> {
        const copy = this.convert(accountsReceivable);
        return this.http
            .put<AccountsReceivable>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AccountsReceivable>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AccountsReceivable[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AccountsReceivable[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountsReceivable[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<AccountsReceivable[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AccountsReceivable[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountsReceivable[]>) => this.convertArrayResponse(res));
    }

    findByInvoiceId(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AccountsReceivable>(`${this.resourceUrlByInvoiceId}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AccountsReceivable = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    refreshAccountsReceivables(invoiceNumber: string): Observable<void> {
        return this.http.post<void>(`${this.refreshAccountsUrl}/${invoiceNumber}`, { observe: 'response' });
    }

    private convertArrayResponse(res: HttpResponse<AccountsReceivable[]>): HttpResponse<AccountsReceivable[]> {
        const jsonResponse: AccountsReceivable[] = res.body;
        const body: AccountsReceivable[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AccountsReceivable.
     */
    private convertItemFromServer(accountsReceivable: AccountsReceivable): AccountsReceivable {
        const copy: AccountsReceivable = Object.assign({}, accountsReceivable);
        return copy;
    }

    /**
     * Convert a AccountsReceivable to a JSON which can be sent to the server.
     */
    private convert(accountsReceivable: AccountsReceivable): AccountsReceivable {
        const copy: AccountsReceivable = Object.assign({}, accountsReceivable);
        return copy;
    }
}
