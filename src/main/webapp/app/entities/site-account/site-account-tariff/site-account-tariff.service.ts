import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SiteAccountTariff } from './site-account-tariff.model';
import { RATE_REPOSITORY_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';

export type EntityResponseType = HttpResponse<SiteAccountTariff>;

@Injectable()
export class SiteAccountTariffService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/site-account-tariffs';
    private resourceSearchUrl = RATE_REPOSITORY_API_URL + 'api/_search/site-account-tariffs';

    constructor(private http: HttpClient) {}

    create(siteAccountTariff: SiteAccountTariff): Observable<EntityResponseType> {
        const copy = this.convert(siteAccountTariff);
        return this.http
            .post<SiteAccountTariff>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(siteAccountTariff: SiteAccountTariff): Observable<EntityResponseType> {
        const copy = this.convert(siteAccountTariff);
        return this.http
            .put<SiteAccountTariff>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<SiteAccountTariff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SiteAccountTariff[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteAccountTariff[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteAccountTariff[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<SiteAccountTariff[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteAccountTariff[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteAccountTariff[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SiteAccountTariff = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<SiteAccountTariff[]>): HttpResponse<SiteAccountTariff[]> {
        const jsonResponse: SiteAccountTariff[] = res.body;
        const body: SiteAccountTariff[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to SiteAccountTariff.
     */
    private convertItemFromServer(siteAccountTariff: SiteAccountTariff): SiteAccountTariff {
        return Object.assign({}, siteAccountTariff);
    }

    /**
     * Convert a SiteAccountTariff to a JSON which can be sent to the server.
     */
    private convert(siteAccountTariff: SiteAccountTariff): SiteAccountTariff {
        return Object.assign({}, siteAccountTariff);
    }
}
