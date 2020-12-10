import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../../app.constants';

import { createRequestOption } from '../../../shared';
import { EquipmentTypeLocation } from './equipment-type-location.model';

export type EntityResponseTypeEquipmentTypeLocation = HttpResponse<EquipmentTypeLocation>;

@Injectable()
export class EquipmentTypeLocationService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/equipment-type-locations';

    constructor(private http: HttpClient) {}

    create(equipmentType: EquipmentTypeLocation): Observable<EntityResponseTypeEquipmentTypeLocation> {
        return this.http.post<EquipmentTypeLocation>(this.resourceUrl, equipmentType, { observe: 'response' });
    }

    update(equipmentType: EquipmentTypeLocation): Observable<EntityResponseTypeEquipmentTypeLocation> {
        return this.http.put<EquipmentTypeLocation>(this.resourceUrl, equipmentType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseTypeEquipmentTypeLocation> {
        return this.http.get<EquipmentTypeLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByEquipmentTypeId(equipmentTypeId: number): Observable<HttpResponse<EquipmentTypeLocation[]>> {
        return this.http.get<EquipmentTypeLocation[]>(`${this.resourceUrl}/equipment-type-id/${equipmentTypeId}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<EquipmentTypeLocation[]>> {
        const options = createRequestOption(req);
        return this.http.get<EquipmentTypeLocation[]>(`${this.resourceUrl}/page`, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
