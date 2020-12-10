import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL, RATE_REPOSITORY_API_URL } from '../../app.constants';

import { Provider, Tariff } from './tariff.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Tariff>;

@Injectable()
export class ProviderService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/providers';

    constructor(private http: HttpClient) {}

    all(req?: any): Observable<HttpResponse<Provider[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Provider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Provider[]>) => this.convertArrayResponse(res));
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
}
