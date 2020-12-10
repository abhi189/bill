import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Alert } from './alert.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Alert>;

@Injectable()
export class AlertService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/alerts';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/alerts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(alert: Alert): Observable<EntityResponseType> {
        const copy = this.convert(alert);
        return this.http
            .post<Alert>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alert: Alert): Observable<EntityResponseType> {
        const copy = this.convert(alert);
        return this.http
            .put<Alert>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Alert>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Alert[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Alert[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Alert[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Alert[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Alert[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Alert[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Alert = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Alert[]>): HttpResponse<Alert[]> {
        const jsonResponse: Alert[] = res.body;
        const body: Alert[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Alert.
     */
    private convertItemFromServer(alert: Alert): Alert {
        const copy: Alert = Object.assign({}, alert);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(alert.createdDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(alert.lastModified);
        return copy;
    }

    /**
     * Convert a Alert to a JSON which can be sent to the server.
     */
    private convert(alert: Alert): Alert {
        const copy: Alert = Object.assign({}, alert);

        copy.createdDate = this.dateUtils.toDate(alert.createdDate);

        copy.lastModified = this.dateUtils.toDate(alert.lastModified);
        return copy;
    }
}
