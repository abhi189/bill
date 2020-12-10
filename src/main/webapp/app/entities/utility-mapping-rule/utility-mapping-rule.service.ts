import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UtilityMappingRule>;

@Injectable()
export class UtilityMappingRuleService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/utility-mapping-rules';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/utility-mapping-rules';

    constructor(private http: HttpClient) {}

    create(utilityMappingRule: UtilityMappingRule): Observable<EntityResponseType> {
        const copy = this.convert(utilityMappingRule);
        return this.http
            .post<UtilityMappingRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utilityMappingRule: UtilityMappingRule): Observable<EntityResponseType> {
        const copy = this.convert(utilityMappingRule);
        return this.http
            .put<UtilityMappingRule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<UtilityMappingRule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UtilityMappingRule[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<UtilityMappingRule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilityMappingRule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByTariffIdAndJobId(tariffId: string, jobId: string): Observable<EntityResponseType> {
        const params = new HttpParams().set('tariffId', tariffId).set('jobId', jobId);
        return this.http
            .get<UtilityMappingRule>(`${this.resourceUrl}/tariff`, { params, observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    search(req?: any): Observable<HttpResponse<UtilityMappingRule[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<UtilityMappingRule[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilityMappingRule[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UtilityMappingRule = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<UtilityMappingRule[]>): HttpResponse<UtilityMappingRule[]> {
        const jsonResponse: UtilityMappingRule[] = res.body;
        const body: UtilityMappingRule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to UtilityMappingRule.
     */
    private convertItemFromServer(utilityMappingRule: UtilityMappingRule): UtilityMappingRule {
        const copy: UtilityMappingRule = Object.assign({}, utilityMappingRule);
        return copy;
    }

    /**
     * Convert a UtilityMappingRule to a JSON which can be sent to the server.
     */
    private convert(utilityMappingRule: UtilityMappingRule): UtilityMappingRule {
        const copy: UtilityMappingRule = Object.assign({}, utilityMappingRule);
        return copy;
    }
}
