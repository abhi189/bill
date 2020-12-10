import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../../app.constants';
import { DiscountValue } from './discount-value.model';

@Injectable()
export class DiscountValuesService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/discount-values';

    constructor(private http: HttpClient) {}

    removeDiscountValue(discountValueId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${discountValueId}`, { observe: 'response' });
    }

    createDiscountValue(discountValue: DiscountValue): Observable<HttpResponse<DiscountValue>> {
        return this.http.post<DiscountValue>(this.resourceUrl, discountValue, { observe: 'response' });
    }
}
