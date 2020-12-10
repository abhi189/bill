import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StagingMeter } from './staging-meter.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StagingMeter>;

@Injectable()
export class StagingMeterService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/staging-meters';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/staging-meters';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(stagingMeter: StagingMeter): Observable<EntityResponseType> {
        const copy = this.convert(stagingMeter);
        return this.http
            .post<StagingMeter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stagingMeter: StagingMeter): Observable<EntityResponseType> {
        const copy = this.convert(stagingMeter);
        return this.http
            .put<StagingMeter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<StagingMeter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StagingMeter[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingMeter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingMeter[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<StagingMeter[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingMeter[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingMeter[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StagingMeter = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<StagingMeter[]>): HttpResponse<StagingMeter[]> {
        const jsonResponse: StagingMeter[] = res.body;
        const body: StagingMeter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to StagingMeter.
     */
    private convertItemFromServer(stagingMeter: StagingMeter): StagingMeter {
        const copy: StagingMeter = Object.assign({}, stagingMeter);
        copy.intervalStart = this.dateUtils.convertLocalDateFromServer(stagingMeter.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateFromServer(stagingMeter.intervalEnd);
        copy.createDate = this.dateUtils.convertDateTimeFromServer(stagingMeter.createDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(stagingMeter.lastModified);
        return copy;
    }

    /**
     * Convert a StagingMeter to a JSON which can be sent to the server.
     */
    private convert(stagingMeter: StagingMeter): StagingMeter {
        const copy: StagingMeter = Object.assign({}, stagingMeter);
        copy.intervalStart = this.dateUtils.convertLocalDateToServer(stagingMeter.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateToServer(stagingMeter.intervalEnd);

        copy.createDate = this.dateUtils.toDate(stagingMeter.createDate);

        copy.lastModified = this.dateUtils.toDate(stagingMeter.lastModified);
        return copy;
    }
}
