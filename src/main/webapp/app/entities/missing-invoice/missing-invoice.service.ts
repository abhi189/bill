import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MissingInvoice } from './missing-invoice.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MissingInvoice>;

@Injectable()
export class MissingInvoiceService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/missing-invoices';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/missing-invoices';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(missingInvoice: MissingInvoice): Observable<EntityResponseType> {
        const copy = this.convert(missingInvoice);
        return this.http
            .post<MissingInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(missingInvoice: MissingInvoice): Observable<EntityResponseType> {
        const copy = this.convert(missingInvoice);
        return this.http
            .put<MissingInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<MissingInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MissingInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<MissingInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MissingInvoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<MissingInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<MissingInvoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MissingInvoice[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MissingInvoice = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<MissingInvoice[]>): HttpResponse<MissingInvoice[]> {
        const jsonResponse: MissingInvoice[] = res.body;
        const body: MissingInvoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to MissingInvoice.
     */
    private convertItemFromServer(missingInvoice: MissingInvoice): MissingInvoice {
        const copy: MissingInvoice = Object.assign({}, missingInvoice);
        copy.takeOverDate = this.dateUtils.convertDateTimeFromServer(missingInvoice.takeOverDate);
        copy.startDate = this.dateUtils.convertDateTimeFromServer(missingInvoice.startDate);
        copy.endDate = this.dateUtils.convertDateTimeFromServer(missingInvoice.endDate);
        return copy;
    }

    /**
     * Convert a MissingInvoice to a JSON which can be sent to the server.
     */
    private convert(missingInvoice: MissingInvoice): MissingInvoice {
        const copy: MissingInvoice = Object.assign({}, missingInvoice);

        copy.takeOverDate = this.dateUtils.toDate(missingInvoice.takeOverDate);

        copy.startDate = this.dateUtils.toDate(missingInvoice.startDate);

        copy.endDate = this.dateUtils.toDate(missingInvoice.endDate);
        return copy;
    }
}
