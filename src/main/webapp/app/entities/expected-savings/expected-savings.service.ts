import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL, INJOBS_SERVER_API_URL } from '../../app.constants';

import { ExpectedSavings } from './expected-savings.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExpectedSavings>;

@Injectable()
export class ExpectedSavingsService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/expected-savings';
    private resourceInjobsUrl = INJOBS_SERVER_API_URL + 'api';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/expected-savings';

    constructor(private http: HttpClient) {}

    create(expectedSavings: ExpectedSavings): Observable<EntityResponseType> {
        const copy = this.convert(expectedSavings);
        return this.http
            .post<ExpectedSavings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expectedSavings: ExpectedSavings): Observable<EntityResponseType> {
        const copy = this.convert(expectedSavings);
        return this.http
            .put<ExpectedSavings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ExpectedSavings>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByCustomerType(customerType: string): Observable<HttpResponse<ExpectedSavings[]>> {
        return this.http
            .get<ExpectedSavings[]>(`${this.resourceUrl}/findByCustomerType/${customerType}`, { observe: 'response' })
            .map((res: HttpResponse<ExpectedSavings[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExpectedSavings[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ExpectedSavings[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpectedSavings[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<ExpectedSavings[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ExpectedSavings[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExpectedSavings[]>) => this.convertArrayResponse(res));
    }

    getExpectedSavingsSolutions(): Observable<HttpResponse<String[]>> {
        return this.http.get<String[]>(`${this.resourceInjobsUrl}/description-inventory/energy-savings-solutions`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExpectedSavings = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ExpectedSavings[]>): HttpResponse<ExpectedSavings[]> {
        const jsonResponse: ExpectedSavings[] = res.body;
        const body: ExpectedSavings[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ExpectedSavings.
     */
    private convertItemFromServer(expectedSavings: ExpectedSavings): ExpectedSavings {
        const copy: ExpectedSavings = Object.assign({}, expectedSavings);
        return copy;
    }

    /**
     * Convert a ExpectedSavings to a JSON which can be sent to the server.
     */
    private convert(expectedSavings: ExpectedSavings): ExpectedSavings {
        const copy: ExpectedSavings = Object.assign({}, expectedSavings);
        return copy;
    }
}
