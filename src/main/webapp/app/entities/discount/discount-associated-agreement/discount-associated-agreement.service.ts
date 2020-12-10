import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../../app.constants';
import { AssociatedAgreement } from './discount-associated-agreement.model';

@Injectable()
export class DiscountAssociatedAgreementService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/associated-agreements';

    constructor(private http: HttpClient) {}

    getAssociatedAgreements(discountId: number): Observable<HttpResponse<AssociatedAgreement[]>> {
        return this.http.get<AssociatedAgreement[]>(`${this.resourceUrl}/discount-id/${discountId}`, { observe: 'response' });
    }

    createAssociatedAgreement(associatedAgreement: AssociatedAgreement): Observable<HttpResponse<AssociatedAgreement>> {
        return this.http.post<AssociatedAgreement>(this.resourceUrl, associatedAgreement, { observe: 'response' });
    }

    updateAssociatedAgreement(associatedAgreement: AssociatedAgreement): Observable<HttpResponse<AssociatedAgreement>> {
        return this.http.put<AssociatedAgreement>(this.resourceUrl, associatedAgreement, { observe: 'response' });
    }

    deleteAssociatedAgreement(associatedAgreementId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${associatedAgreementId}`, { observe: 'response' });
    }
}
