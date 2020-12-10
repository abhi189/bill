import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StagingConsumption } from './staging-consumption.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StagingConsumption>;

@Injectable()
export class StagingConsumptionService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/staging-consumptions';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/staging-consumptions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(stagingConsumption: StagingConsumption): Observable<EntityResponseType> {
        const copy = this.convert(stagingConsumption);
        return this.http
            .post<StagingConsumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stagingConsumption: StagingConsumption): Observable<EntityResponseType> {
        const copy = this.convert(stagingConsumption);
        return this.http
            .put<StagingConsumption>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<StagingConsumption>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StagingConsumption[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingConsumption[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingConsumption[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<StagingConsumption[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingConsumption[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingConsumption[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StagingConsumption = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<StagingConsumption[]>): HttpResponse<StagingConsumption[]> {
        const jsonResponse: StagingConsumption[] = res.body;
        const body: StagingConsumption[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to StagingConsumption.
     */
    private convertItemFromServer(stagingConsumption: StagingConsumption): StagingConsumption {
        const copy: StagingConsumption = Object.assign({}, stagingConsumption);
        copy.intervalStart = this.dateUtils.convertLocalDateFromServer(stagingConsumption.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateFromServer(stagingConsumption.intervalEnd);
        copy.meterReadDate = this.dateUtils.convertLocalDateFromServer(stagingConsumption.meterReadDate);
        copy.previousMeterReadDate = this.dateUtils.convertLocalDateFromServer(stagingConsumption.previousMeterReadDate);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(stagingConsumption.createdDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(stagingConsumption.lastModified);
        return copy;
    }

    /**
     * Convert a StagingConsumption to a JSON which can be sent to the server.
     */
    private convert(stagingConsumption: StagingConsumption): StagingConsumption {
        const copy: StagingConsumption = Object.assign({}, stagingConsumption);
        copy.intervalStart = this.dateUtils.convertLocalDateToServer(stagingConsumption.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateToServer(stagingConsumption.intervalEnd);
        copy.meterReadDate = this.dateUtils.convertLocalDateToServer(stagingConsumption.meterReadDate);
        copy.previousMeterReadDate = this.dateUtils.convertLocalDateToServer(stagingConsumption.previousMeterReadDate);

        copy.createdDate = this.dateUtils.toDate(stagingConsumption.createdDate);

        copy.lastModified = this.dateUtils.toDate(stagingConsumption.lastModified);
        return copy;
    }
}
