import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RATE_REPOSITORY_API_URL } from '../../app.constants';

import { createRequestOption } from '../../shared';
import { Rate } from './tariff.model';

export type EntityResponseType = HttpResponse<Rate>;

@Injectable()
export class RateService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/rates';
    private resourceSearchUrl = RATE_REPOSITORY_API_URL + 'api/_search/rates';
    private resourceUrlRatesByTariffId = RATE_REPOSITORY_API_URL + 'api/rates-by-tariff-id';

    constructor(private http: HttpClient) {}

    create(rate: Rate): Observable<EntityResponseType> {
        const copy = this.convertItem(rate);
        return this.http
            .post<Rate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rate: Rate): Observable<EntityResponseType> {
        const copy = this.convertItem(rate);
        return this.http
            .put<Rate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Rate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Rate[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Rate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Rate[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Rate[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rate[]>) => this.convertArrayResponse(res));
    }

    findByTariffId(tariffId: number): Observable<HttpResponse<Rate[]>> {
        return this.http
            .get<Rate[]>(`${this.resourceUrlRatesByTariffId}/${tariffId}`, { observe: 'response' })
            .map((res: HttpResponse<Rate[]>) => this.convertArrayResponse(res));
    }

    saveAll(rates: Rate[]): Observable<HttpResponse<Rate[]>> {
        return this.http
            .put<Rate[]>(this.resourceUrl, rates, { observe: 'response' })
            .map((res: HttpResponse<Rate[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Rate = this.convertItem(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Rate[]>): HttpResponse<Rate[]> {
        const jsonResponse: Rate[] = res.body;
        const body: Rate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItem(jsonResponse[i]));
        }
        return res.clone({ body });
    }
    /**
     * Convert a Rate to a JSON which can be sent to the server.
     */
    private convertItem(rate: Rate): Rate {
        return Object.assign({}, rate);
    }
}
