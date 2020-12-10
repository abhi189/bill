import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';
import { Amer, AmerSet } from '../../../shared/model/ame.model';

@Injectable()
export class AmeRatesService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/amers';
    private resourceUrlAmerSet = BILLING_SERVER_API_URL + 'api/amer-sets';

    constructor(private http: HttpClient) {}

    getAmers(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }

    manualCreateAmerSet(amers: Amer[]): Observable<HttpResponse<any>> {
        return this.http.post<AmerSet>(`${this.resourceUrlAmerSet}/manual`, amers, { observe: 'response' });
    }
}
