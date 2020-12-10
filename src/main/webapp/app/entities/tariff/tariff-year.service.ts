import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RATE_REPOSITORY_API_URL } from '../../app.constants';

import { Tariff, TariffYear } from './tariff.model';
import { createRequestOption } from '../../shared';
import { SiteAccount } from '../site-account';

export type EntityResponseType = HttpResponse<TariffYear>;

@Injectable()
export class TariffYearService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/tariff-years';
    private resourceCloneYearUrl = RATE_REPOSITORY_API_URL + 'api/tariff-years/clone';

    constructor(private http: HttpClient) {}

    create(tariffYear: TariffYear): Observable<EntityResponseType> {
        const copy = this.convert(tariffYear);
        return this.http
            .post<TariffYear>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tariffYear: TariffYear): Observable<EntityResponseType> {
        const copy = this.convert(tariffYear);
        return this.http
            .put<TariffYear>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    clone(tariffYear: TariffYear): Observable<EntityResponseType> {
        const copy = this.convert(tariffYear);
        return this.http
            .post<TariffYear>(this.resourceCloneYearUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TariffYear = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }
    /**
     * Convert a returned JSON object to TariffYear.
     */
    private convertItemFromServer(tariffYear: TariffYear): TariffYear {
        const copy: TariffYear = Object.assign({}, tariffYear);
        return copy;
    }

    /**
     * Convert a TariffYear to a JSON which can be sent to the server.
     */
    private convert(tariffYear: TariffYear): TariffYear {
        const copy: TariffYear = Object.assign({}, tariffYear);
        return copy;
    }
}
