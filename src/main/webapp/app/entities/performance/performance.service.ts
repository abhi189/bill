import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, INVOICE_GENERATION_API_URL } from '../../app.constants';

import { Performance } from './performance.model';
import { createRequestOption } from '../../shared';
import { JhiDateUtils } from 'ng-jhipster/index';

export type EntityResponseType = HttpResponse<Performance>;

@Injectable()
export class PerformanceService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/performances';
    private resourceUrlByInvoiceId = INVOICE_SERVER_API_URL + 'api/performances-by-invoice';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/performances';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(performance: Performance): Observable<EntityResponseType> {
        const copy = this.convert(performance);
        return this.http
            .post<Performance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(performance: Performance): Observable<EntityResponseType> {
        const copy = this.convert(performance);
        return this.http
            .put<Performance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Performance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Performance[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Performance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Performance[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Performance[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Performance[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Performance[]>) => this.convertArrayResponse(res));
    }

    findByInvoiceId(id: number): Observable<HttpResponse<Performance[]>> {
        return this.http
            .get<Performance[]>(`${this.resourceUrlByInvoiceId}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Performance[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Performance = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Performance[]>): HttpResponse<Performance[]> {
        const jsonResponse: Performance[] = res.body;
        const body: Performance[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Performance.
     */
    private convertItemFromServer(performance: Performance): Performance {
        const copy: Performance = Object.assign({}, performance);
        copy.installDate = this.dateUtils.convertLocalDateFromServer(performance.installDate);
        copy.lastInvoice = this.dateUtils.convertLocalDateFromServer(performance.lastInvoice);
        return copy;
    }

    /**
     * Convert a Performance to a JSON which can be sent to the server.
     */
    private convert(performance: Performance): Performance {
        const copy: Performance = Object.assign({}, performance);
        return copy;
    }
}
