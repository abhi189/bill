import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StagingInvoice } from './staging-invoice.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StagingInvoice>;

@Injectable()
export class StagingInvoiceService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/staging-invoices';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/staging-invoices';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(stagingInvoice: StagingInvoice): Observable<EntityResponseType> {
        const copy = this.convert(stagingInvoice);
        return this.http
            .post<StagingInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stagingInvoice: StagingInvoice): Observable<EntityResponseType> {
        const copy = this.convert(stagingInvoice);
        return this.http
            .put<StagingInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<StagingInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StagingInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingInvoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<StagingInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<StagingInvoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StagingInvoice[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StagingInvoice = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<StagingInvoice[]>): HttpResponse<StagingInvoice[]> {
        const jsonResponse: StagingInvoice[] = res.body;
        const body: StagingInvoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to StagingInvoice.
     */
    private convertItemFromServer(stagingInvoice: StagingInvoice): StagingInvoice {
        const copy: StagingInvoice = Object.assign({}, stagingInvoice);
        copy.intervalStart = this.dateUtils.convertLocalDateFromServer(stagingInvoice.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateFromServer(stagingInvoice.intervalEnd);
        copy.statementDate = this.dateUtils.convertDateTimeFromServer(stagingInvoice.statementDate);
        copy.dueByDate = this.dateUtils.convertDateTimeFromServer(stagingInvoice.dueByDate);
        copy.statementCreateDate = this.dateUtils.convertDateTimeFromServer(stagingInvoice.statementCreateDate);
        copy.updatedDate = this.dateUtils.convertDateTimeFromServer(stagingInvoice.updatedDate);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(stagingInvoice.createdDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(stagingInvoice.lastModified);
        return copy;
    }

    /**
     * Convert a StagingInvoice to a JSON which can be sent to the server.
     */
    private convert(stagingInvoice: StagingInvoice): StagingInvoice {
        const copy: StagingInvoice = Object.assign({}, stagingInvoice);
        copy.intervalStart = this.dateUtils.convertLocalDateToServer(stagingInvoice.intervalStart);
        copy.intervalEnd = this.dateUtils.convertLocalDateToServer(stagingInvoice.intervalEnd);

        copy.statementDate = this.dateUtils.toDate(stagingInvoice.statementDate);

        copy.dueByDate = this.dateUtils.toDate(stagingInvoice.dueByDate);

        copy.statementCreateDate = this.dateUtils.toDate(stagingInvoice.statementCreateDate);

        copy.updatedDate = this.dateUtils.toDate(stagingInvoice.updatedDate);

        copy.createdDate = this.dateUtils.toDate(stagingInvoice.createdDate);

        copy.lastModified = this.dateUtils.toDate(stagingInvoice.lastModified);
        return copy;
    }
}
