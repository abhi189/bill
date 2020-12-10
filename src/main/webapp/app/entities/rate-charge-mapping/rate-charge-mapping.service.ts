import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { RateChargeMapping } from './rate-charge-mapping.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RateChargeMapping>;

@Injectable()
export class RateChargeMappingService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/rate-charge-mappings';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/rate-charge-mappings';

    constructor(private http: HttpClient) {}

    create(rateChargeMapping: RateChargeMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateChargeMapping);
        return this.http
            .post<RateChargeMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rateChargeMapping: RateChargeMapping): Observable<EntityResponseType> {
        const copy = this.convert(rateChargeMapping);
        return this.http
            .put<RateChargeMapping>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<RateChargeMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RateChargeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateChargeMapping[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateChargeMapping[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<RateChargeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateChargeMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RateChargeMapping[]>) => this.convertArrayResponse(res));
    }

    getRateChargeMappingsByTariffIdAndJobId(req?: any): Observable<HttpResponse<RateChargeMapping[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<RateChargeMapping[]>(this.resourceUrl + '/tariff', { params: options, observe: 'response' })
            .map((res: HttpResponse<RateChargeMapping[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RateChargeMapping = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<RateChargeMapping[]>): HttpResponse<RateChargeMapping[]> {
        const jsonResponse: RateChargeMapping[] = res.body;
        const body: RateChargeMapping[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to RateChargeMapping.
     */
    private convertItemFromServer(rateChargeMapping: RateChargeMapping): RateChargeMapping {
        const copy: RateChargeMapping = Object.assign({}, rateChargeMapping);
        return copy;
    }

    /**
     * Convert a RateChargeMapping to a JSON which can be sent to the server.
     */
    private convert(rateChargeMapping: RateChargeMapping): RateChargeMapping {
        const copy: RateChargeMapping = Object.assign({}, rateChargeMapping);
        return copy;
    }
}
