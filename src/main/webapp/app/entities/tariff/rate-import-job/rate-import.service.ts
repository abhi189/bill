import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RATE_REPOSITORY_API_URL, BILLINGIMPORT_SERVER_API_URL } from '../../../app.constants';

import { createRequestOption } from '../../../shared';
import { RateImportJob, Task, TaskDescription, TaskStatus, RateImportJobStatus } from './rate-import.model';

@Injectable()
export class RateImportService {
    private resourceUrl = RATE_REPOSITORY_API_URL + 'api/tariffs';
    private resourceImportRateJobsUrl = BILLINGIMPORT_SERVER_API_URL + 'api/import-rate-jobs';

    mockedRateImportJobs: Array<RateImportJob>;

    constructor(private http: HttpClient) {}

    getRateImportJobs(req?: any) {
        return this.http.get<any>(this.resourceImportRateJobsUrl, { params: req, observe: 'response' });
    }

    updateRates(req?: any) {
        return this.http.post<any>(`${this.resourceImportRateJobsUrl}/create-new-job`, req, { observe: 'response' });
    }

    restartJob(id: number) {
        return this.http.get<any>(`${this.resourceImportRateJobsUrl}/restart/${id}`, { observe: 'response' });
    }
}
