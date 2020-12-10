import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { ExcludedRate } from './excluded-rate.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExcludedRate>;

@Injectable()
export class ExcludedRateService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/excluded-rates';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/excluded-rates';

    constructor(private http: HttpClient) {}

    create(excludedRate: ExcludedRate): Observable<EntityResponseType> {
        const copy = this.convert(excludedRate);
        return this.http
            .post<ExcludedRate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(excludedRate: ExcludedRate): Observable<EntityResponseType> {
        const copy = this.convert(excludedRate);
        return this.http
            .put<ExcludedRate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ExcludedRate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExcludedRate[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ExcludedRate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExcludedRate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<ExcludedRate[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ExcludedRate[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExcludedRate[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExcludedRate = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ExcludedRate[]>): HttpResponse<ExcludedRate[]> {
        const jsonResponse: ExcludedRate[] = res.body;
        const body: ExcludedRate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ExcludedRate.
     */
    private convertItemFromServer(excludedRate: ExcludedRate): ExcludedRate {
        const copy: ExcludedRate = Object.assign({}, excludedRate);
        return copy;
    }

    /**
     * Convert a ExcludedRate to a JSON which can be sent to the server.
     */
    private convert(excludedRate: ExcludedRate): ExcludedRate {
        const copy: ExcludedRate = Object.assign({}, excludedRate);
        return copy;
    }
}
