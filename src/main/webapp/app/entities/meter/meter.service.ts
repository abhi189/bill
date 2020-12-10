import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import { Meter } from '../invoice';
import { JhiDateUtils } from 'ng-jhipster';
import { EntityResponseType } from '../webhook-event-logger';

@Injectable()
export class MeterService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/meters';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/meters';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    findServiceTypes(): Observable<HttpResponse<string[]>> {
        return this.http
            .get<string[]>(this.resourceUrl + '/service-type', { observe: 'response' })
            .map((res: HttpResponse<string[]>) => res);
    }

    query(req?: any): Observable<HttpResponse<Meter[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Meter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Meter[]>) => this.convertArrayResponse(res));
    }

    search(req?: any): Observable<HttpResponse<Meter[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Meter[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Meter[]>) => this.convertArrayResponse(res));
    }

    create(meter: Meter): Observable<EntityResponseType> {
        const copy = this.convert(meter);
        return this.http
            .post<Meter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(meter: Meter): Observable<EntityResponseType> {
        const copy = this.convert(meter);
        return this.http
            .put<Meter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Meter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Meter = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Meter[]>): HttpResponse<Meter[]> {
        const jsonResponse: Meter[] = res.body;
        const body: Meter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Invoice.
     */
    private convertItemFromServer(meter: Meter): Meter {
        const copy: Meter = Object.assign({}, meter);

        return copy;
    }

    /**
     * Convert a Invoice to a JSON which can be sent to the server.
     */
    private convert(meter: Meter): Meter {
        const copy: Meter = Object.assign({}, meter);

        if (this.isString(meter.intervalStart)) {
            copy.intervalStart = this.dateUtils.toDate(meter.intervalStart);
        }

        if (this.isString(meter.intervalEnd)) {
            copy.intervalEnd = this.dateUtils.toDate(meter.intervalEnd);
        }

        return copy;
    }

    private isString(x) {
        return x && Object.prototype.toString.call(x) === '[object String]';
    }
}
