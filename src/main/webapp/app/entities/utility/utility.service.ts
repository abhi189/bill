import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { Utility } from './utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Utility>;

@Injectable()
export class UtilityService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/utilities';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/utilities';

    constructor(private http: HttpClient) {}

    create(utility: Utility): Observable<EntityResponseType> {
        const copy = this.convert(utility);
        return this.http
            .post<Utility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utility: Utility): Observable<EntityResponseType> {
        const copy = this.convert(utility);
        return this.http
            .put<Utility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Utility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Utility[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Utility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Utility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Utility[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Utility[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Utility[]>) => this.convertArrayResponse(res));
    }

    getCountries(): Observable<HttpResponse<string[]>> {
        return this.http.get<string[]>(this.resourceUrl + '/countries', { observe: 'response' }).map((res: HttpResponse<string[]>) => res);
    }

    getStates(countryCode: string): Observable<HttpResponse<string[]>> {
        let params = new HttpParams();
        params = params.append('countryCode', countryCode);
        return this.http
            .get<string[]>(this.resourceUrl + '/states', { params, observe: 'response' })
            .map((res: HttpResponse<string[]>) => res);
    }

    getBdUtilityProviderKeys(countryCode: string, state: string): Observable<HttpResponse<string[]>> {
        const params = new HttpParams().set('countryCode', countryCode).set('state', state);
        return this.http
            .get<string[]>(this.resourceUrl + '/bdUtilityProviderKeys', {
                params,
                observe: 'response'
            })
            .map((res: HttpResponse<string[]>) => res);
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Utility = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Utility[]>): HttpResponse<Utility[]> {
        const jsonResponse: Utility[] = res.body;
        const body: Utility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Utility.
     */
    private convertItemFromServer(utility: Utility): Utility {
        const copy: Utility = Object.assign({}, utility);
        return copy;
    }

    /**
     * Convert a Utility to a JSON which can be sent to the server.
     */
    private convert(utility: Utility): Utility {
        const copy: Utility = Object.assign({}, utility);
        return copy;
    }
}
