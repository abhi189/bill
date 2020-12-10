import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ALERT_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AlertActivity } from './alert-activity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlertActivity>;

@Injectable()
export class AlertActivityService {
    private resourceUrl = ALERT_API_URL + 'api/alert-activities';
    private resourceSearchUrl = ALERT_API_URL + 'api/_search/alert-activities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(alertActivity: AlertActivity): Observable<EntityResponseType> {
        const copy = this.convert(alertActivity);
        return this.http
            .post<AlertActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alertActivity: AlertActivity): Observable<EntityResponseType> {
        const copy = this.convert(alertActivity);
        return this.http
            .put<AlertActivity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AlertActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getByAlertId(alertId: number, req?: any): Observable<HttpResponse<AlertActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertActivity[]>(`${this.resourceUrl}/by-alert-id/${alertId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertActivity[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlertActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertActivity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertActivity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<AlertActivity[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertActivity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertActivity[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlertActivity = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<AlertActivity[]>): HttpResponse<AlertActivity[]> {
        const jsonResponse: AlertActivity[] = res.body;
        const body: AlertActivity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AlertActivity.
     */
    private convertItemFromServer(alertActivity: AlertActivity): AlertActivity {
        const copy: AlertActivity = Object.assign({}, alertActivity);
        copy.date = this.dateUtils.convertDateTimeFromServer(alertActivity.date);
        return copy;
    }

    /**
     * Convert a AlertActivity to a JSON which can be sent to the server.
     */
    private convert(alertActivity: AlertActivity): AlertActivity {
        const copy: AlertActivity = Object.assign({}, alertActivity);

        copy.date = this.dateUtils.toDate(alertActivity.date);
        return copy;
    }
}
