import { Injectable } from '@angular/core';
import { AUTH_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeatureToggleService {
    private resourceUrl = AUTH_API_URL + 'api/feature-toggles';

    constructor(private http: HttpClient) {}

    getFeatureEnabledByName(featureName: String): Observable<HttpResponse<boolean>> {
        return this.http.get<boolean>(`${this.resourceUrl}/feature-name/${featureName}`, { observe: 'response' });
    }
}
