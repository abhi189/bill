import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillingCycleActivity } from './billing-cycle-activity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillingCycleActivity>;

@Injectable()
export class BillingCycleActivityService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/billing-cycle-activities';
    private resourceUrlByBillingCycle = INVOICE_SERVER_API_URL + 'api/billing-cycle-activities-by-billing-cycle';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/billing-cycle-activities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(billingCycleActivity: BillingCycleActivity): Observable<EntityResponseType> {
        const copy = this.convert(billingCycleActivity);
        return this.http
            .post<BillingCycleActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billingCycleActivity: BillingCycleActivity): Observable<EntityResponseType> {
        const copy = this.convert(billingCycleActivity);
        return this.http
            .put<BillingCycleActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BillingCycleActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillingCycleActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleActivity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleActivity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByBillingCycleId(id: number, req?: any): Observable<HttpResponse<BillingCycleActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleActivity[]>(`${this.resourceUrlByBillingCycle}/${id}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleActivity[]>) => this.convertArrayResponse(res));
    }

    search(req?: any): Observable<HttpResponse<BillingCycleActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BillingCycleActivity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillingCycleActivity[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillingCycleActivity = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BillingCycleActivity[]>): HttpResponse<BillingCycleActivity[]> {
        const jsonResponse: BillingCycleActivity[] = res.body;
        const body: BillingCycleActivity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BillingCycleActivity.
     */
    private convertItemFromServer(billingCycleActivity: BillingCycleActivity): BillingCycleActivity {
        const copy: BillingCycleActivity = Object.assign({}, billingCycleActivity);
        copy.activityDate = this.dateUtils.convertDateTimeFromServer(billingCycleActivity.activityDate);
        return copy;
    }

    /**
     * Convert a BillingCycleActivity to a JSON which can be sent to the server.
     */
    private convert(billingCycleActivity: BillingCycleActivity): BillingCycleActivity {
        const copy: BillingCycleActivity = Object.assign({}, billingCycleActivity);

        copy.activityDate = this.dateUtils.toDate(billingCycleActivity.activityDate);
        return copy;
    }
}
