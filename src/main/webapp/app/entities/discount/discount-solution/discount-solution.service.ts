import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL } from '../../../app.constants';
import { DiscountSolution } from './discount-solution.model';

@Injectable()
export class DiscountSolutionService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/discount-solutions';

    constructor(private http: HttpClient) {}

    getDiscountSolutions(discountId: number): Observable<HttpResponse<DiscountSolution[]>> {
        return this.http.get<DiscountSolution[]>(`${this.resourceUrl}/discount-id/${discountId}`, { observe: 'response' });
    }

    createDiscountSolution(discountSolution: DiscountSolution): Observable<HttpResponse<DiscountSolution>> {
        return this.http.post<DiscountSolution>(this.resourceUrl, discountSolution, { observe: 'response' });
    }

    updateDiscountSolution(discountSolution: DiscountSolution): Observable<HttpResponse<DiscountSolution>> {
        return this.http.put<DiscountSolution>(this.resourceUrl, discountSolution, { observe: 'response' });
    }

    deleteDiscountSolution(discountSolutionId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${discountSolutionId}`, { observe: 'response' });
    }
}
