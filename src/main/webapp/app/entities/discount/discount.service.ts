import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Discount } from './discount.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Discount>;

@Injectable()
export class DiscountService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/discounts';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/discounts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(discount: Discount): Observable<EntityResponseType> {
        const copy = this.convert(discount);
        return this.http
            .post<Discount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(discount: Discount): Observable<EntityResponseType> {
        const copy = this.convert(discount);
        return this.http
            .put<Discount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Discount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Discount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Discount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Discount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    duplicate(id: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${this.resourceUrl}/duplicate/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Discount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Discount[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Discount[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Discount = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Discount[]>): HttpResponse<Discount[]> {
        const jsonResponse: Discount[] = res.body;
        const body: Discount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Discount.
     */
    private convertItemFromServer(discount: Discount): Discount {
        const copy: Discount = Object.assign({}, discount);
        copy.startDate = this.dateUtils.convertLocalDateFromServer(discount.startDate);
        copy.endDate = this.dateUtils.convertLocalDateFromServer(discount.endDate);
        return copy;
    }

    /**
     * Convert a Discount to a JSON which can be sent to the server.
     */
    private convert(discount: Discount): Discount {
        const copy: Discount = Object.assign({}, discount);
        copy.startDate = this.dateUtils.convertLocalDateToServer(discount.startDate);
        copy.endDate = this.dateUtils.convertLocalDateToServer(discount.endDate);
        return copy;
    }
}
