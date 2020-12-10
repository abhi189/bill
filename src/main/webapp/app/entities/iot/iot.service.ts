import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JhiDateUtils } from 'ng-jhipster';
import { KittedItem } from './kitted-item.model';
import { createRequestOption } from '../../shared';
import { INVENTORY_SERVER_API_URL, SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

export type EntityResponseType = HttpResponse<KittedItem>;

@Injectable()
export class IotService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/kitted-items';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/kitted-items';
    private profileInfoUrl = SERVER_API_URL + 'management/info';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(kittedItem: KittedItem): Observable<EntityResponseType> {
        const copy = this.convert(kittedItem);
        return this.http
            .post<KittedItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAdresses(): Observable<any> {
        return this.http.get<any>('http://localhost:9292', { observe: 'response' });
    }

    getProvisionUrl(): Observable<any> {
        return this.http.get<any>(this.resourceUrl + '/provision-url', { observe: 'response' });
    }

    getToken(): Observable<any> {
        return this.http.get<any>('/authenticate/api/account', { observe: 'response' });
    }

    reset(ipAddress: string, token: string, payload: any): Observable<any> {
        const headers = new HttpHeaders({ Authorization: token });
        return this.http.post<any>('http://' + ipAddress + '/reset', payload, { observe: 'response', headers });
    }

    provision(ipAddress: string, token: string, payload: any): Observable<any> {
        const headers = new HttpHeaders({ Authorization: token });
        return this.http.post<any>('http://' + ipAddress + '/provision', payload, { observe: 'response', headers });
    }

    status(ipAddress: string, token: string, payload: any): Observable<any> {
        const headers = new HttpHeaders({ Authorization: token });
        return this.http.post<any>('http://' + ipAddress + '/status', payload, { observe: 'response', headers });
    }

    update(kittedItem: KittedItem): Observable<EntityResponseType> {
        const copy = this.convert(kittedItem);
        return this.http
            .put<KittedItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<KittedItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<KittedItem[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<KittedItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KittedItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<KittedItem[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<KittedItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KittedItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: KittedItem = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<KittedItem[]>): HttpResponse<KittedItem[]> {
        const jsonResponse: KittedItem[] = res.body;
        const body: KittedItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(jsonResponse[i]);
        }
        return res.clone({ body });
    }

    private convertItemFromServer(kittedItem: KittedItem): KittedItem {
        const copy: KittedItem = Object.assign({}, kittedItem);
        copy.kittedDate = this.dateUtils.convertDateTimeFromServer(kittedItem.kittedDate);
        return copy;
    }

    private convert(kittedItem: KittedItem): KittedItem {
        const copy: KittedItem = Object.assign({}, kittedItem);
        return copy;
    }
}
