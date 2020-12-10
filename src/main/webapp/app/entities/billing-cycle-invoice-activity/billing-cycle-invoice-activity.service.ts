import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillingCycleInvoiceActivity>;

@Injectable()
export class BillingCycleInvoiceActivityService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/billing-cycle-invoice-activities';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/billing-cycle-invoice-activities';
    private resourceByBudderflyInvoiceUrl = INVOICE_SERVER_API_URL + 'api/billing-cycle-invoice-activities-by-budderfly-invoice';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(billingCycleInvoiceActivity: BillingCycleInvoiceActivity): Observable<EntityResponseType> {
        const copy = this.convert(billingCycleInvoiceActivity);
        return this.http
            .post<BillingCycleInvoiceActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billingCycleInvoiceActivity: BillingCycleInvoiceActivity): Observable<EntityResponseType> {
        const copy = this.convert(billingCycleInvoiceActivity);
        return this.http
            .put<BillingCycleInvoiceActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BillingCycleInvoiceActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillingCycleInvoiceActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleInvoiceActivity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BillingCycleInvoiceActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleInvoiceActivity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.convertArrayResponse(res));
    }

    findByBudderflyInvoice(id?: number, req?: any): Observable<HttpResponse<BillingCycleInvoiceActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleInvoiceActivity[]>(`${this.resourceByBudderflyInvoiceUrl}/${id}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillingCycleInvoiceActivity = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BillingCycleInvoiceActivity[]>): HttpResponse<BillingCycleInvoiceActivity[]> {
        const jsonResponse: BillingCycleInvoiceActivity[] = res.body;
        const body: BillingCycleInvoiceActivity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BillingCycleInvoiceActivity.
     */
    private convertItemFromServer(billingCycleInvoiceActivity: BillingCycleInvoiceActivity): BillingCycleInvoiceActivity {
        const copy: BillingCycleInvoiceActivity = Object.assign({}, billingCycleInvoiceActivity);
        copy.activityDate = this.dateUtils.convertDateTimeFromServer(billingCycleInvoiceActivity.activityDate);
        return copy;
    }

    /**
     * Convert a BillingCycleInvoiceActivity to a JSON which can be sent to the server.
     */
    private convert(billingCycleInvoiceActivity: BillingCycleInvoiceActivity): BillingCycleInvoiceActivity {
        const copy: BillingCycleInvoiceActivity = Object.assign({}, billingCycleInvoiceActivity);

        copy.activityDate = this.dateUtils.toDate(billingCycleInvoiceActivity.activityDate);
        return copy;
    }
}
