import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { Provider } from './provider.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Provider>;

@Injectable()
export class ProviderService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/providers';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/providers';

    constructor(private http: HttpClient) {}

    create(provider: Provider): Observable<EntityResponseType> {
        const copy = this.convert(provider);
        return this.http
            .post<Provider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(provider: Provider): Observable<EntityResponseType> {
        const copy = this.convert(provider);
        return this.http
            .put<Provider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Provider>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Provider[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Provider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Provider[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Provider[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Provider[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Provider[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Provider = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Provider[]>): HttpResponse<Provider[]> {
        const jsonResponse: Provider[] = res.body;
        const body: Provider[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Provider.
     */
    private convertItemFromServer(provider: Provider): Provider {
        const copy: Provider = Object.assign({}, provider);
        return copy;
    }

    /**
     * Convert a Provider to a JSON which can be sent to the server.
     */
    private convert(provider: Provider): Provider {
        const copy: Provider = Object.assign({}, provider);
        return copy;
    }
}
