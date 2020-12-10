import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InventoryItemType } from './../inventory-item-type/inventory-item-type.model';

export type EntityResponseType = HttpResponse<InventoryItemType>;

@Injectable()
export class InventoryItemTypeService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/inventory-item-types';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    getAllInventoryItemTypes(): Observable<HttpResponse<InventoryItemType[]>> {
        return this.http
            .get<InventoryItemType[]>(this.resourceUrl, { observe: 'response' })
            .map((res: HttpResponse<InventoryItemType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InventoryItemType = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<InventoryItemType[]>): HttpResponse<InventoryItemType[]> {
        const jsonResponse: InventoryItemType[] = res.body;
        const body: InventoryItemType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to InventoryItem.
     */
    private convertItemFromServer(inventoryItemType: InventoryItemType): InventoryItemType {
        const copy: InventoryItemType = Object.assign({}, inventoryItemType);
        return copy;
    }

    /**
     * Convert a InventoryItem to a JSON which can be sent to the server.
     */
    private convert(inventoryItem: InventoryItemType): InventoryItemType {
        const copy: InventoryItemType = Object.assign({}, inventoryItem);
        return copy;
    }
}
