import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVOICE_SERVER_API_URL, INJOBS_SERVER_API_URL, INVOICE_GENERATION_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BudderflyInvoice, BudderflyInvoiceStatus } from './budderfly-invoice.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BudderflyInvoice>;

@Injectable()
export class BudderflyInvoiceService {
    private resourceUrl = INVOICE_SERVER_API_URL + 'api/budderfly-invoices';
    private resourceSearchUrl = INVOICE_SERVER_API_URL + 'api/_search/budderfly-invoices';
    private resourceByBillingCicle = this.resourceUrl + '/by-billing-cycle';
    private getBillingRequestStatus = INJOBS_SERVER_API_URL + 'api/billing-requests/status';
    private getSiteByBillingRequestStatusUrl = INJOBS_SERVER_API_URL + 'api/billing-requests/sites-by-state-and-active-invoicing';
    private getSitesByPreviousBillingCycleUrl = this.resourceUrl + '/sites-by-previous-billing-cycle';
    private addSitesByBudderflyIdUrl = 'invoices-by-budderfly-id';
    private pullInvoicesAndSendUrl = 'pullInvoicesAndSend';
    private getSitesByBillingRequestDateUrl = INJOBS_SERVER_API_URL + 'api/billing-requests/sites-by-take-over-date-and-active-invoicing';
    private generateInvoicesByPreviousBillingCycleUrl = INVOICE_SERVER_API_URL + 'api/invoices-by-previous-billing-cycle';
    private getAllTakeOverDatesUrl = INJOBS_SERVER_API_URL + 'api/billing-requests/take-over-dates';
    private generateInvoicesFromInjobsUrl = INVOICE_SERVER_API_URL + 'api/invoices-by-utiliy-request-date';
    private updateInvoiceFromDetailUrl = INVOICE_GENERATION_API_URL + 'api/update-invoice-from-detail';
    private generateInvoiceFromDetailUrl = INVOICE_GENERATION_API_URL + 'api/generate-invoice-with-detail';

    private changeStatusUrl = 'change-status';
    private generateInvoicesDetailForBillingCycleUrl = this.resourceUrl + '/generate-invoice-details';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(budderflyInvoice: BudderflyInvoice): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoice);
        return this.http
            .post<BudderflyInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(budderflyInvoice: BudderflyInvoice): Observable<EntityResponseType> {
        const copy = this.convert(budderflyInvoice);
        return this.http
            .put<BudderflyInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<BudderflyInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BudderflyInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<BudderflyInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoice[]>) => this.convertArrayResponse(res));
    }

    pullInvoiceAndSend(id: number): Observable<HttpResponse<any>> {
        return this.http.post(`${this.resourceUrl}/${this.pullInvoicesAndSendUrl}/${id}`, null, { observe: 'response' });
    }

    updateInvoiceFromDetail(invoiceNumber: string): Observable<HttpResponse<any>> {
        return this.http.post(`${this.updateInvoiceFromDetailUrl}/${invoiceNumber}`, null, { observe: 'response' });
    }

    generateInvoicesDetailForBillingCycle(billingCycleId: number): Observable<HttpResponse<any>> {
        return this.http.post(`${this.generateInvoicesDetailForBillingCycleUrl}/${billingCycleId}`, null, { observe: 'response' });
    }
    generateInvoiceFromDetail(invoiceNumber: string): Observable<HttpResponse<any>> {
        return this.http.post(`${this.generateInvoiceFromDetailUrl}/${invoiceNumber}`, null, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BudderflyInvoice = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    public getInvoicesByBillingCycle(billingCycleId: number, req?: any): Observable<HttpResponse<BudderflyInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoice[]>(`${this.resourceByBillingCicle}/${billingCycleId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoice[]>) => this.convertArrayResponse(res));
    }

    public getByBudderflyId(budderflyId: string, req?: any): Observable<HttpResponse<BudderflyInvoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<BudderflyInvoice[]>(`${this.resourceUrl}/by-budderfly-id/${budderflyId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<BudderflyInvoice[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<BudderflyInvoice[]>): HttpResponse<BudderflyInvoice[]> {
        const jsonResponse: BudderflyInvoice[] = res.body;
        const body: BudderflyInvoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    public getSitesByUtilityRequestDateAndStatus(
        requestDate: any,
        activeInvoicing: boolean,
        billingCycleId: number,
        status: any
    ): Observable<void> {
        if (!status) {
            return this.http.post<void>(`${this.generateInvoicesFromInjobsUrl}/${requestDate}/${activeInvoicing}/${billingCycleId}`, {
                observe: 'response'
            });
        }
        return this.http.post<void>(`${this.generateInvoicesFromInjobsUrl}/${requestDate}/${activeInvoicing}/${billingCycleId}/${status}`, {
            observe: 'response'
        });
    }

    public addSitesBySiteList(id: number, budderflyId: String) {
        return this.http
            .post<BudderflyInvoice[]>(`${this.resourceUrl}/${id}/${this.addSitesByBudderflyIdUrl}/${budderflyId}`, id, {
                observe: 'response'
            })
            .map((res: HttpResponse<BudderflyInvoice[]>) => this.convertArrayResponse(res));
    }

    public generateInvoicesByPreviousBillingCycle(currentBillingCycle: number, previousBillingCycle: number): Observable<void> {
        return this.http.post<void>(`${this.generateInvoicesByPreviousBillingCycleUrl}/${currentBillingCycle}/${previousBillingCycle}`, {
            observe: 'response'
        });
    }

    public getAllTakeOverDates(): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(`${this.getAllTakeOverDatesUrl}`, { observe: 'response' });
    }

    public getBillingRequesStatuses(): Observable<HttpResponse<any[]>> {
        return this.http.get<String[]>(`${this.getBillingRequestStatus}`, { observe: 'response' });
    }

    approveBudderflyInvoice(budderflyInvoice: BudderflyInvoice): Observable<EntityResponseType> {
        const invoice: BudderflyInvoice = JSON.parse(JSON.stringify(budderflyInvoice));
        invoice.budderflyInvoiceStatus = BudderflyInvoiceStatus.APPROVED;
        return this.http
            .put<BudderflyInvoice>(`${this.resourceUrl}/${this.changeStatusUrl}`, invoice, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    rejectBudderflyInvoice(budderflyInvoice: BudderflyInvoice, notes: string): Observable<EntityResponseType> {
        const invoice: BudderflyInvoice = JSON.parse(JSON.stringify(budderflyInvoice));
        invoice.rejectionNotes = notes;
        invoice.budderflyInvoiceStatus = BudderflyInvoiceStatus.REJECTED;
        return this.http
            .put<BudderflyInvoice>(`${this.resourceUrl}/${this.changeStatusUrl}`, invoice, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    /**
     * Convert a returned JSON object to BudderflyInvoice.
     */
    private convertItemFromServer(budderflyInvoice: BudderflyInvoice): BudderflyInvoice {
        const copy: BudderflyInvoice = Object.assign({}, budderflyInvoice);
        copy.lastInvoice = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.lastInvoice);
        copy.LEDInstallDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.LEDInstallDate);
        copy.accountTakeOverDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.accountTakeOverDate);
        copy.startDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.startDate);
        copy.endDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.endDate);
        copy.statementDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.statementDate);
        copy.dueDate = this.dateUtils.convertLocalDateFromServer(budderflyInvoice.dueDate);
        return copy;
    }

    /**
     * Convert a BudderflyInvoice to a JSON which can be sent to the server.
     */
    private convert(budderflyInvoice: BudderflyInvoice): BudderflyInvoice {
        const copy: BudderflyInvoice = Object.assign({}, budderflyInvoice);
        copy.lastInvoice = this.dateUtils.convertLocalDateToServer(budderflyInvoice.lastInvoice);
        copy.LEDInstallDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.LEDInstallDate);
        copy.accountTakeOverDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.accountTakeOverDate);
        copy.startDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.startDate);
        copy.endDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.endDate);
        copy.statementDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.statementDate);
        copy.dueDate = this.dateUtils.convertLocalDateToServer(budderflyInvoice.dueDate);
        return copy;
    }
}
