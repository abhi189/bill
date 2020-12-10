import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../app.constants';

import { Adjustment } from './adjustment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Adjustment>;

@Injectable()
export class AdjustmentService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/adjustments';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/adjustments';
    private adjustmentByInvoiceUrl = INVOICE_SERVER_API_URL + 'api/adjustments-by-invoice-id';

    constructor(private http: HttpClient) {}

    create(adjustment: Adjustment): Observable<EntityResponseType> {
        const copy = this.convert(adjustment);
        return this.http
            .post<Adjustment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(adjustment: Adjustment): Observable<EntityResponseType> {
        const copy = this.convert(adjustment);
        return this.http
            .put<Adjustment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Adjustment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Adjustment[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Adjustment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Adjustment[]>) => this.convertArrayResponse(res));
    }

    findByInvoiceId(id: number) {
        return this.http
            .get<Adjustment[]>(`${this.adjustmentByInvoiceUrl}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Adjustment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Adjustment[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Adjustment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Adjustment[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Adjustment = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Adjustment[]>): HttpResponse<Adjustment[]> {
        const jsonResponse: Adjustment[] = res.body;
        const body: Adjustment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Adjustment.
     */
    private convertItemFromServer(adjustment: Adjustment): Adjustment {
        const copy: Adjustment = Object.assign({}, adjustment);
        return copy;
    }

    /**
     * Convert a Adjustment to a JSON which can be sent to the server.
     */
    private convert(adjustment: Adjustment): Adjustment {
        const copy: Adjustment = Object.assign({}, adjustment);
        return copy;
    }
}
