import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { JobExecutionAuditLog } from '../../entities/job-execution-audit-log/job-execution-audit-log.model';
import { JobExecutionAuditLogService } from '../../entities/job-execution-audit-log/job-execution-audit-log.service';

import { JobDescriptionService } from './job-description.service';

import { ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-job-description-job-execution-audit',
    templateUrl: '../../entities/job-execution-audit-log/job-execution-audit-log.component.html'
})
export class JobDescriptionJobExecutionAuditComponent implements OnInit {
    jobExecutionAuditLogs: JobExecutionAuditLog[];
    error: any;
    success: any;
    currentSearch: string;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    jobId: any;

    constructor(
        private jobExecutionAuditLogService: JobExecutionAuditLogService,
        private jobDescriptionService: JobDescriptionService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = true;
        this.predicate = 'id';
        this.activatedRoute.params.subscribe(params => {
            this.jobId = params['id'];
        });
    }

    loadAll() {
        this.jobExecutionAuditLogService
            .query({
                'jobDescriptionId.equals': this.jobId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<JobExecutionAuditLog[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.loadAll();
    }

    clear() {
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }

        this.currentSearch = query;
        this.jobExecutionAuditLogService
            .search({
                page: this.page - 1,
                query: `jobDescriptionId:${this.jobId} AND ${this.currentSearch}`,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<JobExecutionAuditLog[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
    }

    trackId(index: number, item: JobExecutionAuditLog) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.jobExecutionAuditLogs = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
