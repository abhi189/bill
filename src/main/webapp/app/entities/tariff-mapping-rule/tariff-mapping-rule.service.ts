import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { TariffMappingRule } from './tariff-mapping-rule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TariffMappingRule>;

@Injectable()
export class TariffMappingRuleService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/tariff-mapping-rules';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/tariff-mapping-rules';

    constructor(private http: HttpClient) {}

    create(tariffMappingRule: TariffMappingRule): Observable<EntityResponseType> {
        const copy = this.convert(tariffMappingRule);
        return this.http
            .post<TariffMappingRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tariffMappingRule: TariffMappingRule): Observable<EntityResponseType> {
        const copy = this.convert(tariffMappingRule);
        return this.http
            .put<TariffMappingRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<TariffMappingRule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TariffMappingRule[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffMappingRule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffMappingRule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<TariffMappingRule[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffMappingRule[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffMappingRule[]>) => this.convertArrayResponse(res));
    }

    findByTariffIdAndJobId(tariffId: string, jobId: string): Observable<EntityResponseType> {
        const params = new HttpParams().set('tariffId', tariffId).set('jobId', jobId);
        return this.http
            .get<TariffMappingRule>(`${this.resourceUrl}/tariff`, { params, observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TariffMappingRule = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<TariffMappingRule[]>): HttpResponse<TariffMappingRule[]> {
        const jsonResponse: TariffMappingRule[] = res.body;
        const body: TariffMappingRule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TariffMappingRule.
     */
    private convertItemFromServer(tariffMappingRule: TariffMappingRule): TariffMappingRule {
        const copy: TariffMappingRule = Object.assign({}, tariffMappingRule);
        return copy;
    }

    /**
     * Convert a TariffMappingRule to a JSON which can be sent to the server.
     */
    private convert(tariffMappingRule: TariffMappingRule): TariffMappingRule {
        const copy: TariffMappingRule = Object.assign({}, tariffMappingRule);
        return copy;
    }
}
