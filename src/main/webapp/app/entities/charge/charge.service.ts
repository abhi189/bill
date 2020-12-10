import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Charge } from './charge.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Charge>;

@Injectable()
export class ChargeService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/charges';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/charges';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(charge: Charge): Observable<EntityResponseType> {
        const copy = this.convert(charge);
        return this.http
            .post<Charge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(charge: Charge): Observable<EntityResponseType> {
        const copy = this.convert(charge);
        return this.http
            .put<Charge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Charge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Charge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Charge[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Charge[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Charge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Charge[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Charge[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Charge = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Charge[]>): HttpResponse<Charge[]> {
        const jsonResponse: Charge[] = res.body;
        const body: Charge[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Charge.
     */
    private convertItemFromServer(charge: Charge): Charge {
        const copy: Charge = Object.assign({}, charge);
        copy.intervalStart = this.dateUtils.convertDateTimeFromServer(charge.intervalStart);
        copy.intervalEnd = this.dateUtils.convertDateTimeFromServer(charge.intervalEnd);
        copy.createDate = this.dateUtils.convertDateTimeFromServer(charge.createDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(charge.lastModified);
        return copy;
    }

    /**
     * Convert a Charge to a JSON which can be sent to the server.
     */
    private convert(charge: Charge): Charge {
        const copy: Charge = Object.assign({}, charge);

        if (this.isString(charge.intervalStart)) {
            copy.intervalStart = this.dateUtils.toDate(charge.intervalStart);
        }

        if (this.isString(charge.intervalEnd)) {
            copy.intervalEnd = this.dateUtils.toDate(charge.intervalEnd);
        }

        if (this.isString(charge.createDate)) {
            copy.createDate = this.dateUtils.toDate(charge.createDate);
        }

        return copy;
    }

    private isString(x) {
        return x && Object.prototype.toString.call(x) === '[object String]';
    }
}
