import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SCHEDULING_SERVER_API_URL } from '../../app.constants';

import { DataRetention } from './data-retention.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DataRetention>;

@Injectable()
export class DataRetentionService {
    private resourceUrl = SCHEDULING_SERVER_API_URL + 'api/data-retentions';
    private resourceSearchUrl = SCHEDULING_SERVER_API_URL + 'api/_search/data-retentions';

    constructor(private http: HttpClient) {}

    create(dataRetention: DataRetention): Observable<EntityResponseType> {
        const copy = this.convert(dataRetention);
        return this.http
            .post<DataRetention>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dataRetention: DataRetention): Observable<EntityResponseType> {
        const copy = this.convert(dataRetention);
        return this.http
            .put<DataRetention>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<DataRetention>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DataRetention[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<DataRetention[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DataRetention[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<DataRetention[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<DataRetention[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DataRetention[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DataRetention = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<DataRetention[]>): HttpResponse<DataRetention[]> {
        const jsonResponse: DataRetention[] = res.body;
        const body: DataRetention[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to DataRetention.
     */
    private convertItemFromServer(dataRetention: DataRetention): DataRetention {
        const copy: DataRetention = Object.assign({}, dataRetention);
        return copy;
    }

    /**
     * Convert a DataRetention to a JSON which can be sent to the server.
     */
    private convert(dataRetention: DataRetention): DataRetention {
        const copy: DataRetention = Object.assign({}, dataRetention);
        return copy;
    }
}
