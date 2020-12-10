import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RateUsageTypeMapping>;

@Injectable()
export class RateUsageTypeMappingService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/rate-usage-type-mappings';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/rate-usage-type-mappings';

    constructor(private http: HttpClient) {}

    create(rateUsageTypeMapping: RateUsageTypeMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateUsageTypeMapping);
        return this.http
            .post<RateUsageTypeMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rateUsageTypeMapping: RateUsageTypeMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateUsageTypeMapping);
        return this.http
            .put<RateUsageTypeMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<RateUsageTypeMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RateUsageTypeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateUsageTypeMapping[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateUsageTypeMapping[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<RateUsageTypeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateUsageTypeMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateUsageTypeMapping[]>) => this.convertArrayResponse(res));
    }

    getRateUsageTypeMappingsByTariffIdAndJobId(req?: any): Observable<HttpResponse<RateUsageTypeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateUsageTypeMapping[]>(this.resourceUrl + '/tariff', {
                params: options,
                observe: 'response'
            })
            .map((res: HttpResponse<RateUsageTypeMapping[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RateUsageTypeMapping = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<RateUsageTypeMapping[]>): HttpResponse<RateUsageTypeMapping[]> {
        const jsonResponse: RateUsageTypeMapping[] = res.body;
        const body: RateUsageTypeMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to RateUsageTypeMapping.
     */
    private convertItemFromServer(rateUsageTypeMapping: RateUsageTypeMapping): RateUsageTypeMapping {
        const copy: RateUsageTypeMapping = Object.assign({}, rateUsageTypeMapping);
        return copy;
    }

    /**
     * Convert a RateUsageTypeMapping to a JSON which can be sent to the server.
     */
    private convert(rateUsageTypeMapping: RateUsageTypeMapping): RateUsageTypeMapping {
        const copy: RateUsageTypeMapping = Object.assign({}, rateUsageTypeMapping);
        return copy;
    }
}
