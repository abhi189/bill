import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { ExcludedPassthrough } from './excluded-passthrough.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExcludedPassthrough>;

@Injectable()
export class ExcludedPassthroughService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/excluded-passthroughs';
    private resourceUrlGetBySiteAccountId = BILLING_SERVER_API_URL + 'api/excluded-passthroughs/site-account-id';

    constructor(private http: HttpClient) {}

    create(excludedPassthrough: ExcludedPassthrough): Observable<EntityResponseType> {
        const copy = this.convert(excludedPassthrough);
        return this.http
            .post<ExcludedPassthrough>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(excludedPassthrough: ExcludedPassthrough): Observable<EntityResponseType> {
        const copy = this.convert(excludedPassthrough);
        return this.http
            .put<ExcludedPassthrough>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ExcludedPassthrough>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getExcludedPassthroughBySiteAccountId(id: number): Observable<HttpResponse<ExcludedPassthrough[]>> {
        return this.http
            .get<ExcludedPassthrough[]>(`${this.resourceUrlGetBySiteAccountId}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<ExcludedPassthrough[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExcludedPassthrough[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ExcludedPassthrough[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExcludedPassthrough[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExcludedPassthrough = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ExcludedPassthrough[]>): HttpResponse<ExcludedPassthrough[]> {
        const jsonResponse: ExcludedPassthrough[] = res.body;
        const body: ExcludedPassthrough[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ExcludedPassthrough.
     */
    private convertItemFromServer(excludedPassthrough: ExcludedPassthrough): ExcludedPassthrough {
        const copy: ExcludedPassthrough = Object.assign({}, excludedPassthrough);
        return copy;
    }

    /**
     * Convert a ExcludedPassthrough to a JSON which can be sent to the server.
     */
    private convert(excludedPassthrough: ExcludedPassthrough): ExcludedPassthrough {
        const copy: ExcludedPassthrough = Object.assign({}, excludedPassthrough);
        return copy;
    }
}
