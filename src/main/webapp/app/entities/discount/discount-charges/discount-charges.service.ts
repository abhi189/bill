import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../../app.constants';
import { DiscountCharge } from './discount-charge.model';

@Injectable()
export class DiscountChargesService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/discount-charges';

    constructor(private http: HttpClient) {}

    getDiscountCharges(discountId: number): Observable<HttpResponse<DiscountCharge[]>> {
        return this.http.get<DiscountCharge[]>(`${this.resourceUrl}/discount-id/${discountId}`, { observe: 'response' });
    }

    createDiscountCharge(discountCharge: DiscountCharge): Observable<HttpResponse<DiscountCharge>> {
        return this.http.post<DiscountCharge>(this.resourceUrl, discountCharge, { observe: 'response' });
    }

    updateDiscountCharge(discountCharge: DiscountCharge): Observable<HttpResponse<DiscountCharge>> {
        return this.http.put<DiscountCharge>(this.resourceUrl, discountCharge, { observe: 'response' });
    }

    deleteDiscountCharge(discountChargeId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${discountChargeId}`, { observe: 'response' });
    }
}
