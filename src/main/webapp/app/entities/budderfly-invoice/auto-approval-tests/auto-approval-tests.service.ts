import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BudderflyInvoiceValidation } from './auto-approval-tests.model';
import { BudderflyInvoice } from '../budderfly-invoice.model';
import { INVOICE_VALIDATION_API_URL } from '../../../app.constants';

export type EntityResponseType = HttpResponse<BudderflyInvoiceValidation>;

@Injectable()
export class BudderflyInvoiceValidationService {
    private resourceUrlGetAll = INVOICE_VALIDATION_API_URL + 'api/budderfly-invoice-validations/all-enabled-ordered';
    private resourceResultsUrl = INVOICE_VALIDATION_API_URL + 'api/budderfly-invoice-validation-results';
    private resourceUrlGetAllByInvoiceId = INVOICE_VALIDATION_API_URL + 'api/budderfly-invoice-validation-results/by-budderfly-invoice-id';

    constructor(private http: HttpClient) {}

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BudderflyInvoiceValidation>(`${this.resourceResultsUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAllByInvoiceId(budderflyInvoiceId: number): Observable<HttpResponse<BudderflyInvoiceValidation[]>> {
        return this.http
            .get<BudderflyInvoiceValidation[]>(`${this.resourceUrlGetAllByInvoiceId}/${budderflyInvoiceId}`, { observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceValidation[]>) => this.convertArrayResponse(res));
    }

    getAll(): Observable<HttpResponse<BudderflyInvoiceValidation[]>> {
        return this.http
            .get<BudderflyInvoiceValidation[]>(`${this.resourceUrlGetAll}`, { observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoiceValidation[]>) => this.convertArrayResponse(res));
    }

    runTest(invoice: BudderflyInvoice, endpoint: string): Observable<HttpResponse<boolean>> {
        return this.http.post<boolean>(`${INVOICE_VALIDATION_API_URL}${endpoint}`, invoice, { observe: 'response' });
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
