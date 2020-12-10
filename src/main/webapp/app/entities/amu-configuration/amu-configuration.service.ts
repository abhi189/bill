import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { AmuConfiguration } from './amu-configuration.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AmuConfiguration>;

@Injectable()
export class AmuConfigurationService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/amu-configurations';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/amu-configurations';

    constructor(private http: HttpClient) {}

    create(amuConfiguration: AmuConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(amuConfiguration);
        return this.http
            .post<AmuConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(amuConfiguration: AmuConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(amuConfiguration);
        return this.http
            .put<AmuConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<AmuConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AmuConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AmuConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AmuConfiguration[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<AmuConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<AmuConfiguration[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AmuConfiguration[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AmuConfiguration = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<AmuConfiguration[]>): HttpResponse<AmuConfiguration[]> {
        const jsonResponse: AmuConfiguration[] = res.body;
        const body: AmuConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AmuConfiguration.
     */
    private convertItemFromServer(amuConfiguration: AmuConfiguration): AmuConfiguration {
        const copy: AmuConfiguration = Object.assign({}, amuConfiguration);
        return copy;
    }

    /**
     * Convert a AmuConfiguration to a JSON which can be sent to the server.
     */
    private convert(amuConfiguration: AmuConfiguration): AmuConfiguration {
        const copy: AmuConfiguration = Object.assign({}, amuConfiguration);
        return copy;
    }
}
