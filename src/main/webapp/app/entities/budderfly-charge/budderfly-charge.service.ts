import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, INVOICE_GENERATION_API_URL } from '../../app.constants';

import { BudderflyCharge } from './budderfly-charge.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BudderflyCharge>;

@Injectable()
export class BudderflyChargeService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/charges';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/charges';

    constructor(private http: HttpClient) {}

    create(budderflyCharge: BudderflyCharge): Observable<EntityResponseType> {
        const copy = this.convert(budderflyCharge);
        return this.http
            .post<BudderflyCharge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(budderflyCharge: BudderflyCharge): Observable<EntityResponseType> {
        const copy = this.convert(budderflyCharge);
        return this.http
            .put<BudderflyCharge>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BudderflyCharge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BudderflyCharge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyCharge[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyCharge[]>) => this.convertArrayResponse(res));
    }

    getByBudderflyInvoiceId(budderflyInvoiceId: string): Observable<HttpResponse<BudderflyCharge[]>> {
        return this.http
            .get<BudderflyCharge[]>(`${this.resourceUrl}/byInvoiceId/${budderflyInvoiceId}`, { observe: 'response' })
            .map((res: HttpResponse<BudderflyCharge[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BudderflyCharge[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyCharge[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyCharge[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BudderflyCharge = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BudderflyCharge[]>): HttpResponse<BudderflyCharge[]> {
        const jsonResponse: BudderflyCharge[] = res.body;
        const body: BudderflyCharge[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BudderflyCharge.
     */
    private convertItemFromServer(budderflyCharge: BudderflyCharge): BudderflyCharge {
        const copy: BudderflyCharge = Object.assign({}, budderflyCharge);
        return copy;
    }

    /**
     * Convert a BudderflyCharge to a JSON which can be sent to the server.
     */
    private convert(budderflyCharge: BudderflyCharge): BudderflyCharge {
        const copy: BudderflyCharge = Object.assign({}, budderflyCharge);
        return copy;
    }
}
