import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ALERT_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AlertNote } from './alert-note.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlertNote>;

@Injectable()
export class AlertNoteService {
    private resourceUrl = ALERT_API_URL + 'api/notes';
    private resourceSearchUrl = ALERT_API_URL + 'api/_search/notes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(alertNote: AlertNote): Observable<EntityResponseType> {
        const copy = this.convert(alertNote);
        return this.http
            .post<AlertNote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alertNote: AlertNote): Observable<EntityResponseType> {
        const copy = this.convert(alertNote);
        return this.http
            .put<AlertNote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AlertNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getByAlertId(alertId: number, req?: any): Observable<HttpResponse<AlertNote[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertNote[]>(`${this.resourceUrl}/by-alert-id/${alertId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertNote[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlertNote[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertNote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertNote[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<AlertNote[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertNote[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertNote[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlertNote = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<AlertNote[]>): HttpResponse<AlertNote[]> {
        const jsonResponse: AlertNote[] = res.body;
        const body: AlertNote[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AlertNote.
     */
    private convertItemFromServer(alertNote: AlertNote): AlertNote {
        const copy: AlertNote = Object.assign({}, alertNote);
        copy.date = this.dateUtils.convertDateTimeFromServer(alertNote.date);
        return copy;
    }

    /**
     * Convert a AlertNote to a JSON which can be sent to the server.
     */
    private convert(alertNote: AlertNote): AlertNote {
        const copy: AlertNote = Object.assign({}, alertNote);

        copy.date = this.dateUtils.toDate(alertNote.date);
        return copy;
    }
}
