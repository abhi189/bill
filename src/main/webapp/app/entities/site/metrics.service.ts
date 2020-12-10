import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL, ACCOUNTING_SERVER_API_URL } from '../../app.constants';
import { RequestDTO } from './site.model';

import { JhiDateUtils } from 'ng-jhipster';

import { EquipmentReport, RefrigerationReport } from '../equipment';

export type EntityReportResponseType = HttpResponse<EquipmentReport>;

@Injectable()
export class MetricsService {
    private resourceUrl = SERVER_API_URL + 'budderflymetrics/api/metrics';
    private ke2ResourceUrl = SERVER_API_URL + 'budderflymetrics/api/refrigeration';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    getYearReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<EquipmentReport>> {
        return this.http
            .post<EquipmentReport>(`${this.resourceUrl}/year-report/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<EquipmentReport>) => this.convertReportResponse(res));
    }

    getMonthReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<EquipmentReport>> {
        return this.http
            .post<EquipmentReport>(`${this.resourceUrl}/month-report/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<EquipmentReport>) => this.convertReportResponse(res));
    }

    getDayReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<EquipmentReport>> {
        return this.http
            .post<EquipmentReport>(`${this.resourceUrl}/day-report/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<EquipmentReport>) => this.convertReportResponse(res));
    }

    getHourReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<EquipmentReport>> {
        return this.http
            .post<EquipmentReport>(`${this.resourceUrl}/hour-report/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<EquipmentReport>) => this.convertReportResponse(res));
    }

    getKe2HourReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<RefrigerationReport>> {
        return this.http
            .post<RefrigerationReport>(`${this.ke2ResourceUrl}/silver-hour/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<RefrigerationReport>) => this.convertReportResponse(res));
    }

    getKe2DayReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<RefrigerationReport>> {
        return this.http
            .post<RefrigerationReport>(`${this.ke2ResourceUrl}/silver-day/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<RefrigerationReport>) => this.convertReportResponse(res));
    }

    getKe2MonthReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<RefrigerationReport>> {
        return this.http
            .post<RefrigerationReport>(`${this.ke2ResourceUrl}/silver-month/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<RefrigerationReport>) => this.convertReportResponse(res));
    }

    getKe2YearReportByMonitorId(monitorId: string, requestDto: RequestDTO): Observable<HttpResponse<RefrigerationReport>> {
        return this.http
            .post<RefrigerationReport>(`${this.ke2ResourceUrl}/silver-year/monitor_id/${monitorId}`, requestDto, { observe: 'response' })
            .map((res: HttpResponse<RefrigerationReport>) => this.convertReportResponse(res));
    }

    private convertReportResponse(res: EntityReportResponseType): EntityReportResponseType {
        const body: EquipmentReport = this.convertReportItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AlertMs.
     */
    private convertReportItemFromServer(equipmentReport: EquipmentReport): EquipmentReport {
        const copy: EquipmentReport = Object.assign({}, equipmentReport);
        return copy;
    }

    /**
     * Convert a Site to a JSON which can be sent to the server.
     */
    private convert(equipmentReport: EquipmentReport): EquipmentReport {
        const copy: EquipmentReport = Object.assign({}, equipmentReport);
        return copy;
    }
}
