import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class AmeActivitiesService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/ame-activities';

    constructor(private http: HttpClient) {}

    getActivities(ameId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/ame-id/${ameId}`, { observe: 'response' });
    }
}
