import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { BudderflyInvoiceDiscount } from './budderfly-invoice-discount.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BudderflyInvoiceDiscount>;

@Injectable()
export class BudderflyInvoiceDiscountService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/budderfly-invoice-discounts';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/budderfly-invoice-discounts';

    constructor(private http: HttpClient) {}

    create(budderflyInvoiceDiscount: BudderflyInvoiceDiscount): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoiceDiscount);
        return this.http
            .post<BudderflyInvoiceDiscount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(budderflyInvoiceDiscount: BudderflyInvoiceDiscount): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoiceDiscount);
        return this.http
            .put<BudderflyInvoiceDiscount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BudderflyInvoiceDiscount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getByBudderflyInvoiceId(id: number): Observable<HttpResponse<BudderflyInvoiceDiscount>> {
        return this.http
            .get<BudderflyInvoiceDiscount>(`${this.resourceUrl}/by-invoice-id/${id}`, { observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceDiscount>) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BudderflyInvoiceDiscount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoiceDiscount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceDiscount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BudderflyInvoiceDiscount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoiceDiscount[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceDiscount[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BudderflyInvoiceDiscount = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BudderflyInvoiceDiscount[]>): HttpResponse<BudderflyInvoiceDiscount[]> {
        const jsonResponse: BudderflyInvoiceDiscount[] = res.body;
        const body: BudderflyInvoiceDiscount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BudderflyInvoiceDiscount.
     */
    private convertItemFromServer(budderflyInvoiceDiscount: BudderflyInvoiceDiscount): BudderflyInvoiceDiscount {
        const copy: BudderflyInvoiceDiscount = Object.assign({}, budderflyInvoiceDiscount);
        return copy;
    }

    /**
     * Convert a BudderflyInvoiceDiscount to a JSON which can be sent to the server.
     */
    private convert(budderflyInvoiceDiscount: BudderflyInvoiceDiscount): BudderflyInvoiceDiscount {
        const copy: BudderflyInvoiceDiscount = Object.assign({}, budderflyInvoiceDiscount);
        return copy;
    }
}
