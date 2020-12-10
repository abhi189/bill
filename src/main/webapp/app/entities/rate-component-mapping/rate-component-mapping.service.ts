import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { RateComponentMapping } from './rate-component-mapping.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RateComponentMapping>;

@Injectable()
export class RateComponentMappingService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/rate-component-mappings';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/rate-component-mappings';

    constructor(private http: HttpClient) {}

    create(rateComponentMapping: RateComponentMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateComponentMapping);
        return this.http
            .post<RateComponentMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rateComponentMapping: RateComponentMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateComponentMapping);
        return this.http
            .put<RateComponentMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<RateComponentMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RateComponentMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateComponentMapping[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateComponentMapping[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<RateComponentMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateComponentMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateComponentMapping[]>) => this.convertArrayResponse(res));
    }

    getRateComponentMappingsByTariffIdAndJobId(req?: any): Observable<HttpResponse<RateComponentMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateComponentMapping[]>(this.resourceUrl + '/tariff', {
                params: options,
                observe: 'response'
            })
            .map((res: HttpResponse<RateComponentMapping[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RateComponentMapping = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<RateComponentMapping[]>): HttpResponse<RateComponentMapping[]> {
        const jsonResponse: RateComponentMapping[] = res.body;
        const body: RateComponentMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to RateComponentMapping.
     */
    private convertItemFromServer(rateComponentMapping: RateComponentMapping): RateComponentMapping {
        const copy: RateComponentMapping = Object.assign({}, rateComponentMapping);
        return copy;
    }

    /**
     * Convert a RateComponentMapping to a JSON which can be sent to the server.
     */
    private convert(rateComponentMapping: RateComponentMapping): RateComponentMapping {
        const copy: RateComponentMapping = Object.assign({}, rateComponentMapping);
        return copy;
    }
}
