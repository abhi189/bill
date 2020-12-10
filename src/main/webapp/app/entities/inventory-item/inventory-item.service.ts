import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InventoryItem } from './inventory-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InventoryItem>;

@Injectable()
export class InventoryItemService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/inventory-items';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/inventory-items';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(inventoryItem: InventoryItem): Observable<EntityResponseType> {
        const copy = this.convert(inventoryItem);
        return this.http
            .post<InventoryItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inventoryItem: InventoryItem): Observable<EntityResponseType> {
        const copy = this.convert(inventoryItem);
        return this.http
            .put<InventoryItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<InventoryItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InventoryItem[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<InventoryItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InventoryItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<InventoryItem[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<InventoryItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InventoryItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InventoryItem = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<InventoryItem[]>): HttpResponse<InventoryItem[]> {
        const jsonResponse: InventoryItem[] = res.body;
        const body: InventoryItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to InventoryItem.
     */
    private convertItemFromServer(inventoryItem: InventoryItem): InventoryItem {
        const copy: InventoryItem = Object.assign({}, inventoryItem);
        copy.installDate = this.dateUtils.convertLocalDateFromServer(inventoryItem.installDate);
        return copy;
    }

    /**
     * Convert a InventoryItem to a JSON which can be sent to the server.
     */
    private convert(inventoryItem: InventoryItem): InventoryItem {
        const copy: InventoryItem = Object.assign({}, inventoryItem);
        copy.installDate = this.dateUtils.convertLocalDateToServer(inventoryItem.installDate);
        return copy;
    }
}
