import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ACCOUNTING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NoticeReport, NoticeCountReport } from './notice-report.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NoticeReport>;
export type EventsEntityCountReportResponseType = HttpResponse<NoticeCountReport>;

@Injectable()
export class NoticeReportService {
    private resourceUrl = ACCOUNTING_SERVER_API_URL + 'api/notice-reports';
    private resourceUrlSiteBalances = ACCOUNTING_SERVER_API_URL + 'api/site-balances';
    private resourceSearchUrl = ACCOUNTING_SERVER_API_URL + 'api/_search/notice-reports';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<NoticeReport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NoticeReport[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<NoticeReport[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NoticeReport[]>) => this.convertArrayResponse(res));
    }

    search(req?: any): Observable<HttpResponse<NoticeReport[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<NoticeReport[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NoticeReport[]>) => this.convertArrayResponse(res));
    }

    triggerCampaign(campaignType: string): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrlSiteBalances}/generate-campaign/${campaignType}`, { observe: 'response' });
    }

    getCountReport(id: number): Observable<HttpResponse<NoticeCountReport>> {
        return this.http
            .get<NoticeCountReport>(`${this.resourceUrlSiteBalances}/countReport/${id}`, { observe: 'response' })
            .map((res: HttpResponse<NoticeCountReport>) => this.convertCountReportResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NoticeReport = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<NoticeReport[]>): HttpResponse<NoticeReport[]> {
        const jsonResponse: NoticeReport[] = res.body;
        const body: NoticeReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to NoticeReport.
     */
    private convertItemFromServer(noticeReport: NoticeReport): NoticeReport {
        const copy: NoticeReport = Object.assign({}, noticeReport);
        copy.date = this.dateUtils.convertDateTimeFromServer(noticeReport.date);
        return copy;
    }

    /**
     * Convert a NoticeReport to a JSON which can be sent to the server.
     */
    private convert(noticeReport: NoticeReport): NoticeReport {
        const copy: NoticeReport = Object.assign({}, noticeReport);

        copy.date = this.dateUtils.toDate(noticeReport.date);
        return copy;
    }

    private convertCountReportResponse(res: EventsEntityCountReportResponseType): EventsEntityCountReportResponseType {
        const body: NoticeCountReport = this.convertNoticeCountReportFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to NoticeCountReport.
     */
    private convertNoticeCountReportFromServer(noticeCountReport: NoticeCountReport): NoticeCountReport {
        const copy: NoticeCountReport = Object.assign({}, noticeCountReport);
        return copy;
    }
}
