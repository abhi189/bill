import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WebhookEventLogger } from './webhook-event-logger.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WebhookEventLogger>;

@Injectable()
export class WebhookEventLoggerService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/webhook-event-loggers';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/webhook-event-loggers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(webhookEventLogger: WebhookEventLogger): Observable<EntityResponseType> {
        const copy = this.convert(webhookEventLogger);
        return this.http
            .post<WebhookEventLogger>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(webhookEventLogger: WebhookEventLogger): Observable<EntityResponseType> {
        const copy = this.convert(webhookEventLogger);
        return this.http
            .put<WebhookEventLogger>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<WebhookEventLogger>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WebhookEventLogger[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<WebhookEventLogger[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WebhookEventLogger[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<WebhookEventLogger[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<WebhookEventLogger[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WebhookEventLogger[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WebhookEventLogger = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<WebhookEventLogger[]>): HttpResponse<WebhookEventLogger[]> {
        const jsonResponse: WebhookEventLogger[] = res.body;
        const body: WebhookEventLogger[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to WebhookEventLogger.
     */
    private convertItemFromServer(webhookEventLogger: WebhookEventLogger): WebhookEventLogger {
        const copy: WebhookEventLogger = Object.assign({}, webhookEventLogger);
        copy.eventDate = this.dateUtils.convertDateTimeFromServer(webhookEventLogger.eventDate);
        return copy;
    }

    /**
     * Convert a WebhookEventLogger to a JSON which can be sent to the server.
     */
    private convert(webhookEventLogger: WebhookEventLogger): WebhookEventLogger {
        const copy: WebhookEventLogger = Object.assign({}, webhookEventLogger);

        copy.eventDate = this.dateUtils.toDate(webhookEventLogger.eventDate);
        return copy;
    }
}
