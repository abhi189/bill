import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, INVOICE_GENERATION_API_URL } from '../../app.constants';

import { Solution } from './solution.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Solution>;

@Injectable()
export class SolutionService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/solutions';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/solutions';
    private solutionsByInvoiceUrl = INVOICE_SERVER_API_URL + 'api/solutions-by-invoice-id';
    private refreshSolutionsUrl = INVOICE_GENERATION_API_URL + 'api/solutions';

    constructor(private http: HttpClient) {}

    create(solution: Solution): Observable<EntityResponseType> {
        const copy = this.convert(solution);
        return this.http
            .post<Solution>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(solution: Solution): Observable<EntityResponseType> {
        const copy = this.convert(solution);
        return this.http
            .put<Solution>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Solution>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Solution[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Solution[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Solution[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Solution[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Solution[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Solution[]>) => this.convertArrayResponse(res));
    }

    findByInvoiceId(id: number): Observable<HttpResponse<Solution[]>> {
        return this.http
            .get<Solution[]>(`${this.solutionsByInvoiceUrl}/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Solution[]>) => this.convertArrayResponse(res));
    }

    refreshSolutions(invoiceNumber: string): Observable<void> {
        return this.http.post<void>(`${this.refreshSolutionsUrl}/${invoiceNumber}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Solution = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Solution[]>): HttpResponse<Solution[]> {
        const jsonResponse: Solution[] = res.body;
        const body: Solution[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Solution.
     */
    private convertItemFromServer(solution: Solution): Solution {
        const copy: Solution = Object.assign({}, solution);
        return copy;
    }

    /**
     * Convert a Solution to a JSON which can be sent to the server.
     */
    private convert(solution: Solution): Solution {
        const copy: Solution = Object.assign({}, solution);
        return copy;
    }
}
