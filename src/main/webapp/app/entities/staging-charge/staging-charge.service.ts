import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StagingCharge } from './staging-charge.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StagingCharge>;

@Injectable()
export class StagingChargeService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/staging-charges';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/staging-charges';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(stagingCharge: StagingCharge): Observable<EntityResponseType> {
        const copy = this.convert(stagingCharge);
        return this.http
            .post<StagingCharge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stagingCharge: StagingCharge): Observable<EntityResponseType> {
        const copy = this.convert(stagingCharge);
        return this.http
            .put<StagingCharge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<StagingCharge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StagingCharge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingCharge[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingCharge[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<StagingCharge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingCharge[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingCharge[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StagingCharge = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<StagingCharge[]>): HttpResponse<StagingCharge[]> {
        const jsonResponse: StagingCharge[] = res.body;
        const body: StagingCharge[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to StagingCharge.
     */
    private convertItemFromServer(stagingCharge: StagingCharge): StagingCharge {
        const copy: StagingCharge = Object.assign({}, stagingCharge);
        copy.intervalStart = this.dateUtils.convertLocalDateFromServer(stagingCharge.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateFromServer(stagingCharge.intervalEnd);
        copy.createDate = this.dateUtils.convertDateTimeFromServer(stagingCharge.createDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(stagingCharge.lastModified);
        return copy;
    }

    /**
     * Convert a StagingCharge to a JSON which can be sent to the server.
     */
    private convert(stagingCharge: StagingCharge): StagingCharge {
        const copy: StagingCharge = Object.assign({}, stagingCharge);
        copy.intervalStart = this.dateUtils.convertLocalDateToServer(stagingCharge.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateToServer(stagingCharge.intervalEnd);

        copy.createDate = this.dateUtils.toDate(stagingCharge.createDate);

        copy.lastModified = this.dateUtils.toDate(stagingCharge.lastModified);
        return copy;
    }
}
