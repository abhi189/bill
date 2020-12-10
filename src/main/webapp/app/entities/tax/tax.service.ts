import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Tax } from './tax.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Tax>;

@Injectable()
export class TaxService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/taxes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(tax: Tax): Observable<EntityResponseType> {
        const copy = this.convert(tax);
        return this.http
            .post<Tax>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tax: Tax): Observable<EntityResponseType> {
        const copy = this.convert(tax);
        return this.http
            .put<Tax>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Tax>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Tax[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Tax[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Tax[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Tax = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Tax[]>): HttpResponse<Tax[]> {
        const jsonResponse: Tax[] = res.body;
        const body: Tax[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Tax.
     */
    private convertItemFromServer(tax: Tax): Tax {
        const copy: Tax = Object.assign({}, tax);
        copy.vadidFrom = this.dateUtils.convertLocalDateFromServer(tax.vadidFrom);
        copy.validTo = this.dateUtils.convertLocalDateFromServer(tax.validTo);
        return copy;
    }

    /**
     * Convert a Tax to a JSON which can be sent to the server.
     */
    private convert(tax: Tax): Tax {
        const copy: Tax = Object.assign({}, tax);
        copy.vadidFrom = this.dateUtils.convertLocalDateToServer(tax.vadidFrom);
        copy.validTo = this.dateUtils.convertLocalDateToServer(tax.validTo);
        return copy;
    }
}
