import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SiteAlertType, SiteNoticeType } from './site-configurations.model';

import { JhiDateUtils } from 'ng-jhipster';

import { ALERT_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';

export type AlertEntityResponseType = HttpResponse<SiteAlertType>;
export type NoticeEntityResponseType = HttpResponse<SiteNoticeType>;

@Injectable()
export class SiteConfigurationsService {
    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    getAlertConfigurationsByBfUuid(bfuuid: string, req?: any): Observable<HttpResponse<SiteAlertType[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteAlertType[]>(`${ALERT_API_URL}api/site-alert-types/by-site-uuid/${bfuuid}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteAlertType[]>) => this.convertSiteAlertTypeArrayResponse(res));
    }

    updateAlertConfigurations(siteAlertType: SiteAlertType): Observable<AlertEntityResponseType> {
        const copy = this.convertSiteAlertTypeFromServer(siteAlertType);
        return this.http
            .put<SiteAlertType>(`${ALERT_API_URL}api/site-alert-types`, copy, { observe: 'response' })
            .map((res: AlertEntityResponseType) => this.convertSiteAlertTypeResponse(res));
    }

    getNoticeConfigurationsByBfUuid(bfuuid: string, req?: any): Observable<HttpResponse<SiteNoticeType[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteNoticeType[]>(`${ALERT_API_URL}api/site-notice-types/by-site-uuid/${bfuuid}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteNoticeType[]>) => this.convertSiteNoticeTypeArrayResponse(res));
    }

    updateNoticeConfigurations(siteNoticeType: SiteNoticeType): Observable<NoticeEntityResponseType> {
        const copy = this.convertSiteNoticeTypeFromServer(siteNoticeType);
        return this.http
            .put<SiteNoticeType>(`${ALERT_API_URL}api/site-notice-types`, copy, { observe: 'response' })
            .map((res: NoticeEntityResponseType) => this.convertSiteNoticeTypeResponse(res));
    }

    private convertSiteAlertTypeResponse(res: AlertEntityResponseType): AlertEntityResponseType {
        const body: SiteAlertType = this.convertSiteAlertTypeFromServer(res.body);
        return res.clone({ body });
    }

    private convertSiteAlertTypeArrayResponse(res: HttpResponse<SiteAlertType[]>): HttpResponse<SiteAlertType[]> {
        const jsonResponse: SiteAlertType[] = res.body;
        const body: SiteAlertType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertSiteAlertTypeFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    private convertSiteAlertTypeFromServer(siteAlertType: SiteAlertType): SiteAlertType {
        const copy: SiteAlertType = Object.assign({}, siteAlertType);
        return copy;
    }

    private convertSiteNoticeTypeResponse(res: NoticeEntityResponseType): NoticeEntityResponseType {
        const body: SiteNoticeType = this.convertSiteNoticeTypeFromServer(res.body);
        return res.clone({ body });
    }

    private convertSiteNoticeTypeArrayResponse(res: HttpResponse<SiteNoticeType[]>): HttpResponse<SiteNoticeType[]> {
        const jsonResponse: SiteNoticeType[] = res.body;
        const body: SiteNoticeType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertSiteNoticeTypeFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    private convertSiteNoticeTypeFromServer(siteNoticeType: SiteNoticeType): SiteNoticeType {
        const copy: SiteNoticeType = Object.assign({}, siteNoticeType);
        return copy;
    }
}
