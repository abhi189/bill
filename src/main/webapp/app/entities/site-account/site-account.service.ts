import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL, SITES_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SiteAccount, SiteId, SummaryInvoices } from './site-account.model';
import { Invoice } from '../invoice/invoice.model';
import { Ame, AmeAlgorithm, AmeActivity } from '../../shared/model/ame.model';

import { createRequestOption } from '../../shared';
import { Site } from '../site';

export type EntityResponseType = HttpResponse<SiteAccount>;
export type EntityResponseTypeAme = HttpResponse<Ame>;
export type EntityResponseTypeAmeActivity = HttpResponse<AmeActivity>;

@Injectable()
export class SiteAccountService {
    private resourceUrl = BILLING_SERVER_API_URL + 'api/site-accounts';
    private resourceSiteUrl = SITES_SERVER_API_URL + 'api/sites';
    private resourceAmeActivityUrl = BILLING_SERVER_API_URL + 'api/ame-activities';
    private resourceSearchUrl = BILLING_SERVER_API_URL + 'api/_search/site-accounts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(siteAccount: SiteAccount): Observable<EntityResponseType> {
        const copy = this.convert(siteAccount);
        return this.http
            .post<SiteAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(siteAccount: SiteAccount): Observable<EntityResponseType> {
        const copy = this.convert(siteAccount);
        return this.http
            .put<SiteAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<SiteAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SiteAccount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteAccount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteInvoices(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/invoices/${id}`, { observe: 'response' });
    }

    deleteAmes(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/ames/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<SiteAccount[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<SiteAccount[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteAccount[]>) => this.convertArrayResponse(res));
    }

    calculateAME(siteAccountId: number, startDate: string, algorithm: AmeAlgorithm): Observable<EntityResponseType> {
        return this.http
            .get<Ame>(`${this.resourceUrl}/calculate/${siteAccountId}?startDate=${startDate}&algorithm=${algorithm}`, {
                observe: 'response'
            })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    invoices(id: number, req?: any): Observable<HttpResponse<Invoice[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Invoice[]>(`${this.resourceUrl}/${id}/invoices`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Invoice[]>) => this.convertArrayResponseInvoices(res));
    }

    findAmes(id: number): Observable<HttpResponse<Ame[]>> {
        return this.http
            .get<Ame[]>(`${this.resourceUrl}/${id}/ames`, { observe: 'response' })
            .map((res: HttpResponse<Ame[]>) => this.convertArrayResponseInvoices(res));
    }

    relatedSitesAccounts(budderflyId: string, siteAccount: number): Observable<HttpResponse<SiteAccount[]>> {
        return this.http
            .get<SiteAccount[]>(`${this.resourceUrl}/related/${budderflyId}/${siteAccount}`, { observe: 'response' })
            .map((res: HttpResponse<SiteAccount[]>) => this.convertArrayResponse(res));
    }

    getByBudderflyId(budderflyId: string): Observable<HttpResponse<SiteAccount[]>> {
        return this.http
            .get<SiteAccount[]>(`${this.resourceUrl}/byBudderflyId/${budderflyId}`, { observe: 'response' })
            .map((res: HttpResponse<SiteAccount[]>) => this.convertArrayResponse(res));
    }

    getByBudderflyIdIsNull(): Observable<HttpResponse<SiteAccount[]>> {
        return this.http
            .get<SiteAccount[]>(`${this.resourceUrl}/no-bf-id`, { observe: 'response' })
            .map((res: HttpResponse<SiteAccount[]>) => this.convertArrayResponse(res));
    }

    createAmeActivity(ameActivity: AmeActivity): Observable<EntityResponseTypeAmeActivity> {
        return this.http.post<AmeActivity>(this.resourceAmeActivityUrl, ameActivity, { observe: 'response' });
    }

    getSiteByBudderflyId(budderflyId: string): Observable<HttpResponse<Site>> {
        return this.http.get<Site>(`${this.resourceSiteUrl}/sites-by-budderfly-id/${budderflyId}`, { observe: 'response' });
    }

    getSummaryInvoices(siteAccountIds: number[]): Observable<HttpResponse<SummaryInvoices[]>> {
        return this.http.post<SummaryInvoices[]>(`${this.resourceUrl}/summary-invoices`, siteAccountIds, { observe: 'response' });
    }

    getSitesIds(siteAccountBudderfly: string[]): Observable<HttpResponse<SiteId[]>> {
        return this.http.post<SiteId[]>(`${this.resourceSiteUrl}/site-ids/by-budderfly-id`, siteAccountBudderfly, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SiteAccount = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<SiteAccount[]>): HttpResponse<SiteAccount[]> {
        const jsonResponse: SiteAccount[] = res.body;
        const body: SiteAccount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    private convertArrayResponseInvoices(res: HttpResponse<Invoice[]>): HttpResponse<Invoice[]> {
        const jsonResponse: Invoice[] = res.body;
        const body: Invoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to SiteAccount.
     */
    private convertItemFromServer(siteAccount: SiteAccount): SiteAccount {
        const copy: SiteAccount = Object.assign({}, siteAccount);
        copy.liveDate = this.dateUtils.convertDateTimeFromServer(siteAccount.liveDate);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(siteAccount.createdDate);
        copy.lastModified = this.dateUtils.convertDateTimeFromServer(siteAccount.lastModified);
        copy.requestedDate = this.dateUtils.convertDateTimeFromServer(siteAccount.requestedDate);
        if (typeof copy.summaryInvoices !== 'undefined') {
            copy.summaryInvoices.dateInvoice = this.dateUtils.convertDateTimeFromServer(siteAccount.summaryInvoices.dateInvoice);
        }
        return copy;
    }

    /**
     * Convert a SiteAccount to a JSON which can be sent to the server.
     */
    private convert(siteAccount: SiteAccount): SiteAccount {
        const copy: SiteAccount = Object.assign({}, siteAccount);

        if (this.isString(siteAccount.liveDate)) {
            copy.liveDate = this.dateUtils.toDate(siteAccount.liveDate);
        }

        if (this.isString(siteAccount.createdDate)) {
            copy.createdDate = this.dateUtils.toDate(siteAccount.createdDate);
        }

        if (this.isString(siteAccount.lastModified)) {
            copy.lastModified = this.dateUtils.toDate(siteAccount.lastModified);
        }

        if (this.isString(siteAccount.requestedDate)) {
            copy.requestedDate = this.dateUtils.toDate(siteAccount.requestedDate);
        }
        return copy;
    }

    private isString(x) {
        return x && Object.prototype.toString.call(x) === '[object String]';
    }
}
