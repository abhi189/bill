import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class AmeAlertsService {
    private resourceAmeUrl = BILLING_SERVER_API_URL + 'api/ames';
    private resourceUrl = BILLING_SERVER_API_URL + 'api/ame-issues';

    constructor(private http: HttpClient) {}

    getAlerts(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }

    deleteAlerts(ameId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceAmeUrl}/${ameId}` + '/deleteAlerts', { observe: 'response' });
    }
}
