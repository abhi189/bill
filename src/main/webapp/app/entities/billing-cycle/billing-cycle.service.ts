import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, BILLING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillingCycle } from './billing-cycle.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillingCycle>;

@Injectable()
export class BillingCycleService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/billing-cycles';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/billing-cycles';
    private resourceBillingUrl = BILLING_SERVER_API_URL + 'api/site-account-id-by-budderfly-id';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(billingCycle: BillingCycle): Observable<EntityResponseType> {
        const copy = this.convert(billingCycle);
        return this.http
            .post<BillingCycle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billingCycle: BillingCycle): Observable<EntityResponseType> {
        const copy = this.convert(billingCycle);
        return this.http
            .put<BillingCycle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BillingCycle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillingCycle[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycle[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BillingCycle[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycle[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycle[]>) => this.convertArrayResponse(res));
    }

    getSiteId(budderflyId: String): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.resourceBillingUrl}/${budderflyId}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillingCycle = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BillingCycle[]>): HttpResponse<BillingCycle[]> {
        const jsonResponse: BillingCycle[] = res.body;
        const body: BillingCycle[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BillingCycle.
     */
    private convertItemFromServer(billingCycle: BillingCycle): BillingCycle {
        const copy: BillingCycle = Object.assign({}, billingCycle);
        copy.dueDate = this.dateUtils.convertLocalDateFromServer(billingCycle.dueDate);
        copy.statementDate = this.dateUtils.convertLocalDateFromServer(billingCycle.statementDate);
        return copy;
    }

    /**
     * Convert a BillingCycle to a JSON which can be sent to the server.
     */
    private convert(billingCycle: BillingCycle): BillingCycle {
        const copy: BillingCycle = Object.assign({}, billingCycle);
        copy.dueDate = this.dateUtils.convertLocalDateToServer(billingCycle.dueDate);
        copy.statementDate = this.dateUtils.convertLocalDateToServer(billingCycle.statementDate);
        return copy;
    }
}
