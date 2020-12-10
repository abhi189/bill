import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ACCOUNTING_SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NoticeReportEvents } from './notice-report-events.model';
import { createRequestOption } from '../../../shared';

export type EventsEntityResponseType = HttpResponse<NoticeReportEvents>;

@Injectable()
export class NoticeReportEventsService {
    private resourceUrl = ACCOUNTING_SERVER_API_URL + 'api/notice-report-events';
    private resourceSearchUrl = ACCOUNTING_SERVER_API_URL + 'api/_search/notice-report-events';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    find(id: number): Observable<EventsEntityResponseType> {
        return this.http
            .get<NoticeReportEvents>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EventsEntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NoticeReportEvents[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<NoticeReportEvents[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NoticeReportEvents[]>) => this.convertArrayResponse(res));
    }

    queryByReportId(reportId: number, req?: any): Observable<HttpResponse<NoticeReportEvents[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<NoticeReportEvents[]>(`${this.resourceUrl}/by-report-id/${reportId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<NoticeReportEvents[]>) => this.convertArrayResponse(res));
    }

    getAllinJSON(reportId: number): Observable<HttpResponse<JSON[]>> {
        return this.http.get<JSON[]>(`${this.resourceUrl}/all/by-report-id/${reportId}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<NoticeReportEvents[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<NoticeReportEvents[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NoticeReportEvents[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EventsEntityResponseType): EventsEntityResponseType {
        const body: NoticeReportEvents = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<NoticeReportEvents[]>): HttpResponse<NoticeReportEvents[]> {
        const jsonResponse: NoticeReportEvents[] = res.body;
        const body: NoticeReportEvents[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to NoticeReportEvents.
     */
    private convertItemFromServer(noticeReportEvents: NoticeReportEvents): NoticeReportEvents {
        const copy: NoticeReportEvents = Object.assign({}, noticeReportEvents);
        copy.date = this.dateUtils.convertDateTimeFromServer(noticeReportEvents.date);
        copy.invoiceDueDate = this.dateUtils.convertLocalDateFromServer(noticeReportEvents.invoiceDueDate);
        return copy;
    }

    /**
     * Convert a NoticeReportEvents to a JSON which can be sent to the server.
     */
    private convert(noticeReportEvents: NoticeReportEvents): NoticeReportEvents {
        const copy: NoticeReportEvents = Object.assign({}, noticeReportEvents);

        copy.date = this.dateUtils.toDate(noticeReportEvents.date);
        copy.invoiceDueDate = this.dateUtils.convertLocalDateToServer(noticeReportEvents.invoiceDueDate);
        return copy;
    }
}
