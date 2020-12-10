import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';
import { Amu } from '../../../shared/model/ame.model';

@Injectable()
export class AmuService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/amus';

    constructor(private http: HttpClient) {}

    getAmus(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }

    deleteAmu(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    createAmu(amu: Amu): Observable<HttpResponse<any>> {
        return this.http.post<Amu>(this.resourceUrl, amu, { observe: 'response' });
    }

    updateAmu(amu: Amu): Observable<HttpResponse<any>> {
        return this.http.put<Amu>(this.resourceUrl, amu, { observe: 'response' });
    }
}
