import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';
import { INVOICE_GENERATION_API_URL } from '../../app.constants';

import { Ame, Amer } from '../../shared/model/ame.model';

import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Ame>;

@Injectable()
export class AmeService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/ames';
    private recalculateAmeMonthlyValuesUrl = INVOICE_GENERATION_API_URL + 'api/recalculate-ame-monthly-values';

    constructor(private http: HttpClient) {}

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Ame>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    approve(ame: Ame): Observable<EntityResponseType> {
        return this.http.post<Ame>(this.resourceUrl + '/approve', ame, { observe: 'response' });
    }

    // This method is now deprecated
    recalculateAme(ame: Ame): Observable<EntityResponseType> {
        return this.http.get<Ame>(`${this.resourceUrl}/${ame.id}` + '/recalculate', { observe: 'response' });
    }

    recalculateAmeMonthlyValues(ameId: number): Observable<any> {
        return this.http.get(`${this.recalculateAmeMonthlyValuesUrl}/ameId/${ameId}`, { observe: 'response' });
    }

    recalculateAmun(ame: Ame): Observable<EntityResponseType> {
        return this.http.post<Ame>(`${this.resourceUrl}/${ame.id}` + '/updateCalculation', ame, { observe: 'response' });
    }

    recalculateDollars(ame: Ame): Observable<EntityResponseType> {
        return this.http.post<Ame>(`${this.resourceUrl}/${ame.id}` + '/update-dollars-calculation', ame, { observe: 'response' });
    }

    getExcludedRates(ame: Ame): Observable<HttpResponse<Amer[]>> {
        return this.http.get<Amer[]>(`${this.resourceUrl}/${ame.id}` + '/excluded-amers', { observe: 'response' });
    }

    update(ame: Ame): Observable<EntityResponseType> {
        return this.http.put<Ame>(this.resourceUrl, ame, { observe: 'response' });
    }

    reject(ame: Ame): Observable<EntityResponseType> {
        return this.http.post<Ame>(this.resourceUrl + '/reject', ame, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    updateDollarsCalculation(): Observable<any> {
        return this.http.post<any>(this.resourceUrl + '/update-dollars-calculation', { observe: 'response' });
    }
}
