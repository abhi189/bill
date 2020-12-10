import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Event } from './event.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Event>;

@Injectable()
export class EventService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/events';
    private resourceSearchUrl = INVENTORY_SERVER_API_URL + 'api/_search/events';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(event: Event): Observable<EntityResponseType> {
        const copy = this.convert(event);
        return this.http
            .post<Event>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(event: Event): Observable<EntityResponseType> {
        const copy = this.convert(event);
        return this.http
            .put<Event>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Event>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Event[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Event[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Event[]>) => this.convertArrayResponse(res));
    }

    getByEquipmentId(equipmentId: number, req?: any): Observable<HttpResponse<Event[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Event[]>(`${this.resourceUrl}/by-equipment-id/${equipmentId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Event[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Event[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Event[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Event[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Event = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Event[]>): HttpResponse<Event[]> {
        const jsonResponse: Event[] = res.body;
        const body: Event[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Event.
     */
    private convertItemFromServer(event: Event): Event {
        const copy: Event = Object.assign({}, event);
        copy.eventTimestamp = this.dateUtils.convertDateTimeFromServer(event.eventTimestamp);
        return copy;
    }

    /**
     * Convert a Event to a JSON which can be sent to the server.
     */
    private convert(event: Event): Event {
        const copy: Event = Object.assign({}, event);

        copy.eventTimestamp = this.dateUtils.toDate(event.eventTimestamp);
        return copy;
    }
}
