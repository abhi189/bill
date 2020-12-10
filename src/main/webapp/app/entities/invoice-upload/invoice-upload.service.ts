import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLINGIMPORT_SERVER_API_URL } from '../../app.constants';

import { InvoiceUpload } from './invoice-upload.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceUpload>;

@Injectable()
export class InvoiceUploadService {
    private resourceUrl = BILLINGIMPORT_SERVER_API_URL + 'api/invoice-uploads';
    private resourceSearchUrl = BILLINGIMPORT_SERVER_API_URL + 'api/_search/invoice-uploads';

    constructor(private http: HttpClient) {}

    create(file: File): Observable<EntityResponseType> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        return this.http
            .post<InvoiceUpload>(this.resourceUrl, formdata, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceUpload: InvoiceUpload): Observable<EntityResponseType> {
        const copy = this.convert(invoiceUpload);
        return this.http
            .put<InvoiceUpload>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<InvoiceUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceUpload[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<InvoiceUpload[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceUpload[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<InvoiceUpload[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<InvoiceUpload[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceUpload[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceUpload = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<InvoiceUpload[]>): HttpResponse<InvoiceUpload[]> {
        const jsonResponse: InvoiceUpload[] = res.body;
        const body: InvoiceUpload[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to InvoiceUpload.
     */
    private convertItemFromServer(invoiceUpload: InvoiceUpload): InvoiceUpload {
        const copy: InvoiceUpload = Object.assign({}, invoiceUpload);
        return copy;
    }

    /**
     * Convert a InvoiceUpload to a JSON which can be sent to the server.
     */
    private convert(invoiceUpload: InvoiceUpload): InvoiceUpload {
        const copy: InvoiceUpload = Object.assign({}, invoiceUpload);
        return copy;
    }
}
