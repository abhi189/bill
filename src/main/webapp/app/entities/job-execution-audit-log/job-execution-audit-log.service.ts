import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SCHEDULING_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobExecutionAuditLog } from './job-execution-audit-log.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobExecutionAuditLog>;

@Injectable()
export class JobExecutionAuditLogService {
    private resourceUrl = SCHEDULING_SERVER_API_URL + 'api/job-execution-audit-logs';
    private resourceSearchUrl = SCHEDULING_SERVER_API_URL + 'api/_search/job-execution-audit-logs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(jobExecutionAuditLog: JobExecutionAuditLog): Observable<EntityResponseType> {
        const copy = this.convert(jobExecutionAuditLog);
        return this.http
            .post<JobExecutionAuditLog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobExecutionAuditLog: JobExecutionAuditLog): Observable<EntityResponseType> {
        const copy = this.convert(jobExecutionAuditLog);
        return this.http
            .put<JobExecutionAuditLog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<JobExecutionAuditLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobExecutionAuditLog[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<JobExecutionAuditLog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobExecutionAuditLog[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<JobExecutionAuditLog[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<JobExecutionAuditLog[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobExecutionAuditLog[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobExecutionAuditLog = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<JobExecutionAuditLog[]>): HttpResponse<JobExecutionAuditLog[]> {
        const jsonResponse: JobExecutionAuditLog[] = res.body;
        const body: JobExecutionAuditLog[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to JobExecutionAuditLog.
     */
    private convertItemFromServer(jobExecutionAuditLog: JobExecutionAuditLog): JobExecutionAuditLog {
        const copy: JobExecutionAuditLog = Object.assign({}, jobExecutionAuditLog);
        copy.executionDate = this.dateUtils.convertLocalDateFromServer(jobExecutionAuditLog.executionDate);
        return copy;
    }

    /**
     * Convert a JobExecutionAuditLog to a JSON which can be sent to the server.
     */
    private convert(jobExecutionAuditLog: JobExecutionAuditLog): JobExecutionAuditLog {
        const copy: JobExecutionAuditLog = Object.assign({}, jobExecutionAuditLog);
        copy.executionDate = this.dateUtils.convertLocalDateToServer(jobExecutionAuditLog.executionDate);
        return copy;
    }
}
