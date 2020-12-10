import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ElasticsearchReindexService {
    constructor(private http: HttpClient) {}

    reindex(service): Observable<HttpResponse<any>> {
        return this.http.post<any>(service + 'api/elasticsearch/index', { observe: 'response' });
    }
}
