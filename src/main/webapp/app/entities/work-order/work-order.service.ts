import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SITES_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WorkOrder } from './work-order.model';
import { createRequestOption } from '../../shared';
import { DatePipe } from '@angular/common';

export type EntityResponseType = HttpResponse<WorkOrder>;

@Injectable()
export class WorkOrderService {
    private resourceUrl = SITES_SERVER_API_URL + 'api/work-orders';
    datePipe = new DatePipe('en');

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(workOrder: WorkOrder): Observable<EntityResponseType> {
        const copy = this.convert(workOrder);
        return this.http
            .post<WorkOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(workOrder: WorkOrder): Observable<EntityResponseType> {
        const copy = this.convert(workOrder);
        return this.http
            .put<WorkOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<WorkOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WorkOrder[]>> {
        const options = createRequestOption(req);
        return this.http.get<WorkOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WorkOrder = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<WorkOrder[]>): HttpResponse<WorkOrder[]> {
        const jsonResponse: WorkOrder[] = res.body;
        const body: WorkOrder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to WorkOrder.
     */
    private convertItemFromServer(workOrder: WorkOrder): WorkOrder {
        const copy: WorkOrder = Object.assign({}, workOrder);
        copy.scheduledDateAndTime = this.dateUtils.convertDateTimeFromServer(workOrder.scheduledDateAndTime);
        copy.estimatedCompletionDate = this.convertDateFromServer(workOrder.estimatedCompletionDate);
        copy.creationDate = this.convertDateFromServer(workOrder.creationDate);
        copy.dueDate = this.convertDateFromServer(workOrder.dueDate);
        copy.completionDate = this.convertDateFromServer(workOrder.completionDate);
        copy.createdDate = this.dateUtils.convertDateTimeFromServer(workOrder.createdDate);
        copy.lastModifiedDate = this.dateUtils.convertDateTimeFromServer(workOrder.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a WorkOrder to a JSON which can be sent to the server.
     */
    private convert(workOrder: WorkOrder): WorkOrder {
        const copy: WorkOrder = Object.assign({}, workOrder);
        copy.scheduledDateAndTime = this.datePipe.transform(workOrder.scheduledDateAndTime, 'MM-dd-yyyy HH:mm:ss');
        copy.estimatedCompletionDate = this.dateUtils.convertLocalDateToServer(workOrder.estimatedCompletionDate, 'MM-dd-yyyy');
        copy.creationDate = this.dateUtils.convertLocalDateToServer(workOrder.creationDate, 'MM-dd-yyyy');
        copy.dueDate = this.dateUtils.convertLocalDateToServer(workOrder.dueDate, 'MM-dd-yyyy');
        copy.completionDate = this.dateUtils.convertLocalDateToServer(workOrder.completionDate, 'MM-dd-yyyy');
        copy.createdDate = this.datePipe.transform(workOrder.createdDate, 'MM-dd-yyyy HH:mm:ss');
        copy.lastModifiedDate = this.datePipe.transform(workOrder.lastModifiedDate, 'MM-dd-yyyy HH:mm:ss');
        return copy;
    }

    /**
     * Method to convert date from server when it comes with pattern MM-DD-YYYY
     * Can't use dateUtils.convertLocalDateToServer because it uses pattern YYYY-MM-DD
     */
    private convertDateFromServer(dateStr) {
        if (dateStr) {
            const [month, day, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        }
        return dateStr;
    }
}
