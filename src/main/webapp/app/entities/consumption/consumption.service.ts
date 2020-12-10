import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Consumption } from './consumption.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Consumption>;

@Injectable()
export class ConsumptionService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/consumptions';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/consumptions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(consumption: Consumption): Observable<EntityResponseType> {
        const copy = this.convert(consumption);
        return this.http
            .post<Consumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(consumption: Consumption): Observable<EntityResponseType> {
        const copy = this.convert(consumption);
        return this.http
            .put<Consumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Consumption>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Consumption[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Consumption[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Consumption[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Consumption[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Consumption[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Consumption = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Consumption[]>): HttpResponse<Consumption[]> {
        const jsonResponse: Consumption[] = res.body;
        const body: Consumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Consumption.
     */
    private convertItemFromServer(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);
        copy.intervalStart = this.dateUtils.convertDateTimeFromServer(consumption.intervalStart);
        copy.intervalEnd = this.dateUtils.convertDateTimeFromServer(consumption.intervalEnd);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(consumption.lastModified);
        return copy;
    }

    /**
     * Convert a Consumption to a JSON which can be sent to the server.
     */
    private convert(consumption: Consumption): Consumption {
        const copy: Consumption = Object.assign({}, consumption);

        copy.intervalStart = this.dateUtils.toDate(consumption.intervalStart);

        copy.intervalEnd = this.dateUtils.toDate(consumption.intervalEnd);
        return copy;
    }
}
