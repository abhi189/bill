import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../app.constants';

import { Equipment } from './equipment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Equipment>;

@Injectable()
export class EquipmentService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/equipment';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/equipment';

    constructor(private http: HttpClient) {}

    create(equipment: Equipment): Observable<EntityResponseType> {
        const copy = this.convert(equipment);
        return this.http
            .post<Equipment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(equipment: Equipment): Observable<EntityResponseType> {
        const copy = this.convert(equipment);
        return this.http
            .put<Equipment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Equipment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getByBudderflyId(budderflyId: string): Observable<HttpResponse<Equipment[]>> {
        return this.http
            .get<Equipment[]>(`${this.resourceUrl}/by-budderfly-id/${budderflyId}`, { observe: 'response' })
            .map((res: HttpResponse<Equipment[]>) => this.convertArrayResponse(res));
    }

    getEquipmentsByBudderflyId(budderflyId: string): Observable<HttpResponse<Equipment[]>> {
        return this.http
            .get<Equipment[]>(`${this.resourceUrl}/list-by-budderfly-id/${budderflyId}`, { observe: 'response' })
            .map((res: HttpResponse<Equipment[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Equipment[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Equipment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Equipment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Equipment[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Equipment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Equipment[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Equipment = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Equipment[]>): HttpResponse<Equipment[]> {
        const jsonResponse: Equipment[] = res.body;
        const body: Equipment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Equipment.
     */
    private convertItemFromServer(equipment: Equipment): Equipment {
        const copy: Equipment = Object.assign({}, equipment);
        return copy;
    }

    /**
     * Convert a Equipment to a JSON which can be sent to the server.
     */
    private convert(equipment: Equipment): Equipment {
        const copy: Equipment = Object.assign({}, equipment);
        return copy;
    }
}
