import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JobDescription } from './job-description.model';
import { createRequestOption } from '../../shared';
import { SCHEDULING_SERVER_API_URL } from '../../app.constants';
import { BILLING_SERVER_API_URL } from '../../app.constants';

export type EntityResponseType = HttpResponse<JobDescription>;

@Injectable()
export class JobDescriptionService {
    private resourceUrl = SCHEDULING_SERVER_API_URL + 'api/job-descriptions';
    private resourceSearchUrl = SCHEDULING_SERVER_API_URL + 'api/_search/job-descriptions';

    constructor(private http: HttpClient) {}

    create(jobDescription: JobDescription): Observable<EntityResponseType> {
        const copy = this.convert(jobDescription);
        return this.http
            .post<JobDescription>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobDescription: JobDescription): Observable<EntityResponseType> {
        const copy = this.convert(jobDescription);
        return this.http
            .put<JobDescription>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<JobDescription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobDescription[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<JobDescription[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobDescription[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<JobDescription[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<JobDescription[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobDescription[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobDescription = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<JobDescription[]>): HttpResponse<JobDescription[]> {
        const jsonResponse: JobDescription[] = res.body;
        const body: JobDescription[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to JobDescription.
     */
    private convertItemFromServer(jobDescription: JobDescription): JobDescription {
        const copy: JobDescription = Object.assign({}, jobDescription);
        return copy;
    }

    /**
     * Convert a JobDescription to a JSON which can be sent to the server.
     */
    private convert(jobDescription: JobDescription): JobDescription {
        const copy: JobDescription = Object.assign({}, jobDescription);
        return copy;
    }
}
