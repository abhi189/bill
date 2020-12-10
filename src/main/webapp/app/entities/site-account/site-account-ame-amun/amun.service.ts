import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';
import { Amun } from '../../../shared/model/ame.model';

@Injectable()
export class AmunService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/amuns';

    constructor(private http: HttpClient) {}

    findAmuns(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}`, { params: req, observe: 'response' });
    }

    getAllAmuns(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }

    createAmun(amun: Amun): Observable<HttpResponse<any>> {
        return this.http.post<Amun>(this.resourceUrl, amun, { observe: 'response' });
    }

    updateAmun(amun: Amun): Observable<HttpResponse<any>> {
        return this.http.put<Amun>(this.resourceUrl, amun, { observe: 'response' });
    }

    deleteAmuns(ids: any[]): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/multiple/${ids}`, { observe: 'response' });
    }

    getAmunFilterOptions(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}/filter-options`);
    }
}
