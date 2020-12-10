import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_VALIDATION_API_URL, SERVER_API_URL } from '../../app.constants';

import { BudderflyInvoiceValidation } from './budderfly-invoice-validation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BudderflyInvoiceValidation>;

@Injectable()
export class BudderflyInvoiceValidationService {
    private resourceUrl = INVOICE_VALIDATION_API_URL + 'api/budderfly-invoice-validations';
    private resourceEndpointstUrl = INVOICE_VALIDATION_API_URL + 'api/endpoints';
    private resourceSearchUrl = INVOICE_VALIDATION_API_URL + 'api/_search/budderfly-invoice-validations';

    constructor(private http: HttpClient) {}

    create(budderflyInvoiceValidation: BudderflyInvoiceValidation): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoiceValidation);
        return this.http
            .post<BudderflyInvoiceValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(budderflyInvoiceValidation: BudderflyInvoiceValidation): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoiceValidation);
        return this.http
            .put<BudderflyInvoiceValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BudderflyInvoiceValidation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BudderflyInvoiceValidation[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoiceValidation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceValidation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BudderflyInvoiceValidation[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoiceValidation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceValidation[]>) => this.convertArrayResponse(res));
    }

    getEndpoints(): Observable<HttpResponse<String[]>> {
        return this.http.get<String[]>(this.resourceEndpointstUrl, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BudderflyInvoiceValidation = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BudderflyInvoiceValidation[]>): HttpResponse<BudderflyInvoiceValidation[]> {
        const jsonResponse: BudderflyInvoiceValidation[] = res.body;
        const body: BudderflyInvoiceValidation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to BudderflyInvoiceValidation.
     */
    private convertItemFromServer(budderflyInvoiceValidation: BudderflyInvoiceValidation): BudderflyInvoiceValidation {
        const copy: BudderflyInvoiceValidation = Object.assign({}, budderflyInvoiceValidation);
        return copy;
    }

    /**
     * Convert a BudderflyInvoiceValidation to a JSON which can be sent to the server.
     */
    private convert(budderflyInvoiceValidation: BudderflyInvoiceValidation): BudderflyInvoiceValidation {
        const copy: BudderflyInvoiceValidation = Object.assign({}, budderflyInvoiceValidation);
        return copy;
    }
}
