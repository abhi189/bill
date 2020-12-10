import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BILLING_SERVER_API_URL, INVENTORY_SERVER_API_URL } from '../../app.constants';

import { EquipmentType } from './equipment-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EquipmentType>;

@Injectable()
export class EquipmentTypeService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/equipment-types';
    private resourceBillingUrl = BILLING_SERVER_API_URL + 'api/meters';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/equipment-types';

    constructor(private http: HttpClient) {}

    create(equipmentType: EquipmentType): Observable<EntityResponseType> {
        const copy = this.convert(equipmentType);
        return this.http
            .post<EquipmentType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(equipmentType: EquipmentType): Observable<EntityResponseType> {
        const copy = this.convert(equipmentType);
        return this.http
            .put<EquipmentType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<EquipmentType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAll(): Observable<HttpResponse<EquipmentType[]>> {
        return this.http.get<EquipmentType[]>(this.resourceUrl, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<EquipmentType[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<EquipmentType[]>(`${this.resourceUrl}/page`, { params: options, observe: 'response' })
            .map((res: HttpResponse<EquipmentType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getUtilityMeterNumberByBudderflyId(budderflyId: string) {
        return this.http.get(`${this.resourceBillingUrl}/invoice-meter/budderfly-id/${budderflyId}`, { observe: 'response' });
    }

    deleteReassigningEquipments(id: number, newEquipmentTypeId: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/delete-reassigning-equipments/${id}/new-equipment-id/${newEquipmentTypeId}`, {
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<EquipmentType[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<EquipmentType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EquipmentType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EquipmentType = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<EquipmentType[]>): HttpResponse<EquipmentType[]> {
        const jsonResponse: EquipmentType[] = res.body;
        const body: EquipmentType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to EquipmentType.
     */
    private convertItemFromServer(equipmentType: EquipmentType): EquipmentType {
        const copy: EquipmentType = Object.assign({}, equipmentType);
        return copy;
    }

    /**
     * Convert a EquipmentType to a JSON which can be sent to the server.
     */
    private convert(equipmentType: EquipmentType): EquipmentType {
        const copy: EquipmentType = Object.assign({}, equipmentType);
        return copy;
    }
}
