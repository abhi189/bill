import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL, ACCOUNTING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Site, SiteDiscount } from './site.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Site>;
export type EntityResponseTypeSiteDiscount = HttpResponse<SiteDiscount>;

@Injectable()
export class SiteService {
    private resourceUrl = SERVER_API_URL + 'sites/api/sites';
    private resourceSiteDiscountUrl = SERVER_API_URL + 'invoice/api/site-discounts';
    private siteIdUrl = SERVER_API_URL + 'sites/api/site-id';
    private resourceSearchUrl = SERVER_API_URL + 'sites/api/_search/sites';
    private newresourceSearchUrl = SERVER_API_URL + 'sites/api/_search/owned-by-contacts/false';
    private resourceUrlWithoutUserSites = SERVER_API_URL + 'sites/api/sites/sites-without-authenticate-login/';
    private accountingResourceUrl = ACCOUNTING_SERVER_API_URL + 'api/delete-ach-info-netsuite/';
    private inventoryItemUrl = SERVER_API_URL + 'inventory/api/inventory-items/';

    budderflyId: string;

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(site: Site): Observable<EntityResponseType> {
        const copy = this.convert(site);
        return this.http
            .post<Site>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(site: Site): Observable<EntityResponseType> {
        const copy = this.convert(site);
        return this.http
            .put<Site>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Site>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findInventory(id: number | string): Observable<any> {
        return this.http.get<any>(`${this.inventoryItemUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<Site[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Site[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Site[]>) => this.convertArrayResponse(res));
    }

    queryWithoutUser(req: any, login: string): Observable<HttpResponse<Site[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Site[]>(this.resourceUrlWithoutUserSites + login, { params: options, observe: 'response' })
            .map((res: HttpResponse<Site[]>) => this.convertArrayResponse(res));
    }

    search(req?: any): Observable<HttpResponse<Site[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Site[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Site[]>) => this.convertArrayResponse(res));
    }

    searchByContact(req?: any, userSites: any = []): Observable<HttpResponse<Site[]>> {
        const options = createRequestOption(req);
        return this.http
            .post<Site[]>(this.newresourceSearchUrl, userSites, { params: options, observe: 'response' })
            .map((res: HttpResponse<Site[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteACH(budderflyId: any): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.accountingResourceUrl}/${budderflyId}`, { observe: 'response' });
    }

    getSiteId(budderflyId: String): Observable<HttpResponse<any>> {
        return this.http.get<number>(`${this.siteIdUrl}/${budderflyId}`, { observe: 'response' });
    }

    getAll(): Observable<HttpResponse<Site[]>> {
        return this.http
            .get<Site[]>(`${this.resourceUrl}/all`, { observe: 'response' })
            .map((res: HttpResponse<Site[]>) => this.convertArrayResponse(res));
    }

    getAllinJSON(): Observable<HttpResponse<JSON[]>> {
        return this.http.get<JSON[]>(`${this.resourceUrl}/all`, { observe: 'response' });
    }

    getSiteDiscountByBfid(budderflyId: String): Observable<EntityResponseTypeSiteDiscount> {
        return this.http.get<SiteDiscount>(`${this.resourceSiteDiscountUrl}/bfid/${budderflyId}`, { observe: 'response' });
    }

    findSiteDiscount(id: number): Observable<EntityResponseTypeSiteDiscount> {
        return this.http.get<SiteDiscount>(`${this.resourceSiteDiscountUrl}/${id}`, { observe: 'response' });
    }

    createSiteDiscount(siteDiscount: SiteDiscount): Observable<EntityResponseTypeSiteDiscount> {
        return this.http.post<SiteDiscount>(this.resourceSiteDiscountUrl, siteDiscount, { observe: 'response' });
    }

    updateSiteDiscount(siteDiscount: SiteDiscount): Observable<EntityResponseTypeSiteDiscount> {
        return this.http.put<SiteDiscount>(this.resourceSiteDiscountUrl, siteDiscount, { observe: 'response' });
    }

    deleteSiteDiscount(siteDiscountId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceSiteDiscountUrl}/${siteDiscountId}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Site = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Site[]>): HttpResponse<Site[]> {
        const jsonResponse: Site[] = res.body;
        const body: Site[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Site.
     */
    private convertItemFromServer(site: Site): Site {
        const copy: Site = Object.assign({}, site);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(site.createdDate);
        copy.lastModifiedDate = this.dateUtils.convertDateTimeFromServer(site.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a Site to a JSON which can be sent to the server.
     */
    private convert(site: Site): Site {
        const copy: Site = Object.assign({}, site);
        return copy;
    }
}
