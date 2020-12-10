import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SITES_SERVER_API_URL } from '../../../app.constants';

@Injectable()
export class SiteWorkOrderService {
    private resourceUrl = SITES_SERVER_API_URL + 'api/work-orders';

    constructor(private http: HttpClient) {}

    getWorkOrdersByBudderflyId(budderflyId: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/budderfly-id/${budderflyId}`, { observe: 'response' });
    }
}
