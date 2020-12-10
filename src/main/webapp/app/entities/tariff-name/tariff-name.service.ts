import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RATE_REPOSITORY_API_URL } from '../../app.constants';

import { TariffName } from './tariff-name.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TariffName>;

@Injectable()
export class TariffNameService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/tariff-names';
    private resourceSearchUrl = RATE_REPOSITORY_API_URL + 'api/_search/tariff-names';
    private resourceUrlAll = RATE_REPOSITORY_API_URL + 'api/all-tariff-names';

    constructor(private http: HttpClient) {}

    create(tariffName: TariffName): Observable<EntityResponseType> {
        const copy = this.convert(tariffName);
        return this.http
            .post<TariffName>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tariffName: TariffName): Observable<EntityResponseType> {
        const copy = this.convert(tariffName);
        return this.http
            .put<TariffName>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<TariffName>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TariffName[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffName[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffName[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<TariffName[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffName[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffName[]>) => this.convertArrayResponse(res));
    }

    all(): Observable<HttpResponse<TariffName[]>> {
        return this.http
            .get<TariffName[]>(this.resourceUrlAll, { observe: 'response' })
            .map((res: HttpResponse<TariffName[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TariffName = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<TariffName[]>): HttpResponse<TariffName[]> {
        const jsonResponse: TariffName[] = res.body;
        const body: TariffName[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TariffName.
     */
    private convertItemFromServer(tariffName: TariffName): TariffName {
        const copy: TariffName = Object.assign({}, tariffName);
        return copy;
    }

    /**
     * Convert a TariffName to a JSON which can be sent to the server.
     */
    private convert(tariffName: TariffName): TariffName {
        const copy: TariffName = Object.assign({}, tariffName);
        return copy;
    }
}
