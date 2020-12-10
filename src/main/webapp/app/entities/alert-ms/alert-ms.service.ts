import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ALERT_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AlertMs, AlertMsReport } from './alert-ms.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlertMs>;
export type EntityReportResponseType = HttpResponse<AlertMsReport>;

@Injectable()
export class AlertMsService {
    private resourceUrl = ALERT_API_URL + 'api/alerts';
    private reportResourceUrl = ALERT_API_URL + 'api/alert-report';
    private resourceSearchUrl = ALERT_API_URL + 'api/_search/alerts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(alertMs: AlertMs): Observable<EntityResponseType> {
        const copy = this.convert(alertMs);
        return this.http
            .post<AlertMs>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alertMs: AlertMs): Observable<EntityResponseType> {
        const copy = this.convert(alertMs);
        return this.http
            .put<AlertMs>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AlertMs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlertMs[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertMs[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertMs[]>) => this.convertArrayResponse(res));
    }

    getByBudderflyId(budderflyId: string, req?: any): Observable<HttpResponse<AlertMs[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertMs[]>(`${this.resourceUrl}/by-budderfly-id/${budderflyId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertMs[]>) => this.convertArrayResponse(res));
    }

    getReportByBudderflyId(budderflyId: string): Observable<HttpResponse<AlertMsReport>> {
        return this.http
            .get<AlertMsReport>(`${this.reportResourceUrl}/by-budderfly-id/${budderflyId}`, { observe: 'response' })
            .map((res: HttpResponse<AlertMsReport>) => this.convertReportResponse(res));
    }

    getYearReportByBudderflyId(budderflyId: string, date: string): Observable<HttpResponse<AlertMsReport>> {
        return this.http
            .get<AlertMsReport>(`${this.reportResourceUrl}/by-year/by-budderfly-id/${budderflyId}/date/${date}`, { observe: 'response' })
            .map((res: HttpResponse<AlertMsReport>) => this.convertReportResponse(res));
    }

    getWeekReportByBudderflyId(budderflyId: string, date: string): Observable<HttpResponse<AlertMsReport>> {
        return this.http
            .get<AlertMsReport>(`${this.reportResourceUrl}/by-week/by-budderfly-id/${budderflyId}/date/${date}`, { observe: 'response' })
            .map((res: HttpResponse<AlertMsReport>) => this.convertReportResponse(res));
    }

    getMonthReportByBudderflyId(budderflyId: string, date: string): Observable<HttpResponse<AlertMsReport>> {
        return this.http
            .get<AlertMsReport>(`${this.reportResourceUrl}/by-month/by-budderfly-id/${budderflyId}/date/${date}`, { observe: 'response' })
            .map((res: HttpResponse<AlertMsReport>) => this.convertReportResponse(res));
    }

    getDayReportByBudderflyId(budderflyId: string, date: string): Observable<HttpResponse<AlertMsReport>> {
        return this.http
            .get<AlertMsReport>(`${this.reportResourceUrl}/by-day/by-budderfly-id/${budderflyId}/date/${date}`, { observe: 'response' })
            .map((res: HttpResponse<AlertMsReport>) => this.convertReportResponse(res));
    }

    getByBudderflyIdBetweenDates(budderflyId: string, fromDate: string, key: string, req?: any): Observable<HttpResponse<AlertMs[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertMs[]>(`${this.resourceUrl}/by-budderfly-id/${budderflyId}/by/${key}/from/${fromDate}`, {
                params: options,
                observe: 'response'
            })
            .map((res: HttpResponse<AlertMs[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<AlertMs[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AlertMs[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlertMs[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlertMs = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertReportResponse(res: EntityReportResponseType): EntityReportResponseType {
        const body: AlertMsReport = this.convertReportItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<AlertMs[]>): HttpResponse<AlertMs[]> {
        const jsonResponse: AlertMs[] = res.body;
        const body: AlertMs[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AlertMs.
     */
    private convertItemFromServer(alertMs: AlertMs): AlertMs {
        const copy: AlertMs = Object.assign({}, alertMs);
        copy.alertDate = this.dateUtils.convertDateTimeFromServer(alertMs.alertDate);
        return copy;
    }

    /**
     * Convert a returned JSON object to AlertMs.
     */
    private convertReportItemFromServer(alertMsReport: AlertMsReport): AlertMsReport {
        const copy: AlertMsReport = Object.assign({}, alertMsReport);
        return copy;
    }

    /**
     * Convert a AlertMs to a JSON which can be sent to the server.
     */
    private convert(alertMs: AlertMs): AlertMs {
        const copy: AlertMs = Object.assign({}, alertMs);

        copy.alertDate = this.dateUtils.toDate(alertMs.alertDate);
        return copy;
    }
}
