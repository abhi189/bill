import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RATE_REPOSITORY_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TariffVersionHistory } from './tariff-version-history.model';
import { createRequestOption } from '../../../shared';

export type EntityResponseType = HttpResponse<TariffVersionHistory>;

@Injectable()
export class TariffVersionHistoryService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/tariff-version-histories';
    private resourceSearchUrl = RATE_REPOSITORY_API_URL + 'api/_search/tariff-version-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(tariffVersionHistory: TariffVersionHistory): Observable<EntityResponseType> {
        const copy = this.convert(tariffVersionHistory);
        return this.http
            .post<TariffVersionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tariffVersionHistory: TariffVersionHistory): Observable<EntityResponseType> {
        const copy = this.convert(tariffVersionHistory);
        return this.http
            .put<TariffVersionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<TariffVersionHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TariffVersionHistory[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffVersionHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffVersionHistory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<TariffVersionHistory[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<TariffVersionHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TariffVersionHistory[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TariffVersionHistory = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<TariffVersionHistory[]>): HttpResponse<TariffVersionHistory[]> {
        const jsonResponse: TariffVersionHistory[] = res.body;
        const body: TariffVersionHistory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TariffVersionHistory.
     */
    private convertItemFromServer(tariffVersionHistory: TariffVersionHistory): TariffVersionHistory {
        const copy: TariffVersionHistory = Object.assign({}, tariffVersionHistory);
        copy.effectiveDate = this.dateUtils.convertLocalDateFromServer(tariffVersionHistory.effectiveDate);
        copy.endDate = this.dateUtils.convertLocalDateFromServer(tariffVersionHistory.endDate);
        return copy;
    }

    /**
     * Convert a TariffVersionHistory to a JSON which can be sent to the server.
     */
    private convert(tariffVersionHistory: TariffVersionHistory): TariffVersionHistory {
        const copy: TariffVersionHistory = Object.assign({}, tariffVersionHistory);
        copy.effectiveDate = this.dateUtils.convertLocalDateToServer(tariffVersionHistory.effectiveDate);
        copy.endDate = this.dateUtils.convertLocalDateToServer(tariffVersionHistory.endDate);
        return copy;
    }
}
