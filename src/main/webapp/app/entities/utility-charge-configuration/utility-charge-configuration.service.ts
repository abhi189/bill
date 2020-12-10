import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { createRequestOption } from '../../shared';
import { ChargeUtilityChargeConfiguration } from './charge-utility-charge-configuration.model';

export type EntityResponseType = HttpResponse<UtilityChargeConfiguration>;

@Injectable()
export class UtilityChargeConfigurationService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/utility-charge-configurations';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/utility-charge-configurations';

    constructor(private http: HttpClient) {}

    create(utilityChargeConfiguration: UtilityChargeConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(utilityChargeConfiguration);
        return this.http
            .post<UtilityChargeConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utilityChargeConfiguration: UtilityChargeConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(utilityChargeConfiguration);
        return this.http
            .put<UtilityChargeConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<UtilityChargeConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UtilityChargeConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<UtilityChargeConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilityChargeConfiguration[]>) => this.convertArrayResponse(res));
    }

    queryCharges(req?: any): Observable<HttpResponse<ChargeUtilityChargeConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ChargeUtilityChargeConfiguration[]>(this.resourceUrl + '/charges-grouped', { params: options, observe: 'response' })
            .map((res: HttpResponse<ChargeUtilityChargeConfiguration[]>) => this.convertChargesArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<UtilityChargeConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<UtilityChargeConfiguration[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UtilityChargeConfiguration[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UtilityChargeConfiguration = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<UtilityChargeConfiguration[]>): HttpResponse<UtilityChargeConfiguration[]> {
        const jsonResponse: UtilityChargeConfiguration[] = res.body;
        const body: UtilityChargeConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to UtilityChargeConfiguration.
     */
    private convertItemFromServer(utilityChargeConfiguration: UtilityChargeConfiguration): UtilityChargeConfiguration {
        const copy: UtilityChargeConfiguration = Object.assign({}, utilityChargeConfiguration);
        return copy;
    }

    /**
     * Convert a UtilityChargeConfiguration to a JSON which can be sent to the server.
     */
    private convert(utilityChargeConfiguration: UtilityChargeConfiguration): UtilityChargeConfiguration {
        const copy: UtilityChargeConfiguration = Object.assign({}, utilityChargeConfiguration);
        return copy;
    }

    private convertChargesArrayResponse(
        res: HttpResponse<ChargeUtilityChargeConfiguration[]>
    ): HttpResponse<ChargeUtilityChargeConfiguration[]> {
        const jsonResponse: ChargeUtilityChargeConfiguration[] = res.body;
        const body: ChargeUtilityChargeConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertChargesItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ChargeUtilityChargeConfiguration.
     */
    private convertChargesItemFromServer(utilityChargeConfiguration: ChargeUtilityChargeConfiguration): ChargeUtilityChargeConfiguration {
        const copy: ChargeUtilityChargeConfiguration = Object.assign({}, utilityChargeConfiguration);
        return copy;
    }
}
