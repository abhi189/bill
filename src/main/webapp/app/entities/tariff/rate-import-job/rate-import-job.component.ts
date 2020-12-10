import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RateImportService } from './rate-import.service';
import { RateImportJob, TaskStatus, TaskDescription, RateImportJobStatus, LinksErrorMessages } from './rate-import.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ImportMapping } from '../../import-mapping';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-rate-import-job',
    templateUrl: './rate-import-job.component.html',
    styles: [
        `
            :host /deep/ .progress {
                height: 1.2rem !important;
                border-radius: 0.5rem !important;
            }

            .btn-restart-job {
                margin: -7px;
                float: right;
            }
            .btn-refresh {
                float: right;
                margin: -7px 20px;
            }
            .lnk-fix-mappings {
                padding-left: 30px;
                color: #005cbb;
            }
        `
    ]
})
export class RateImportJobComponent implements OnInit {
    @Input() tariffId: number;
    @Input() jobId: number;
    @Output() loadTariff = new EventEmitter<number>();
    rateImportJobs: Array<RateImportJob> = [];
    itemsPerPage = 10;
    page: any;
    previousPage: any;
    totalItems;
    TaskDescription = TaskDescription;
    TaskStatus = TaskStatus;
    RateImportJobStatus = RateImportJobStatus;
    reverseMappingTaskStatus;
    reverseMappingRateImportJobStatus;
    defaultSorting = ['createdDate,desc'];
    LinksErrorMessages = LinksErrorMessages;
    importMapping: ImportMapping;
    eventSubscriber: Subscription;
    jobRestarted: boolean;

    constructor(private rateImportService: RateImportService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.page = 1;
        this.previousPage = 0;
        this.getRateImportJobs();
        this.initReverseMappingEnums();
        this.jobRestarted = false;
    }

    /** Typescript Enums don't have native reverse mapping for String Enums */
    initReverseMappingEnums() {
        this.reverseMappingTaskStatus = new Map<string, TaskStatus>();
        Object.keys(TaskStatus).forEach((status: TaskStatus) => {
            const statusValue: string = TaskStatus[<any>status];
            this.reverseMappingTaskStatus.set(statusValue, status);
        });

        this.reverseMappingRateImportJobStatus = new Map<string, RateImportJobStatus>();
        Object.keys(RateImportJobStatus).forEach((status: RateImportJobStatus) => {
            const statusValue: string = RateImportJobStatus[<any>status];
            this.reverseMappingRateImportJobStatus.set(statusValue, status);
        });
    }

    getRateImportJobs() {
        const requestOptions = {
            'tariffId.equals': this.tariffId,
            page: this.page - 1,
            sort: this.defaultSorting
        };
        this.rateImportService.getRateImportJobs(requestOptions).subscribe(
            res => {
                this.totalItems = +res.headers.get('X-Total-Count');
                this.rateImportJobs = res.body;
                this.rateImportJobs.forEach(job => {
                    job.importRateJobTasks.sort((a, b) => a.id - b.id);
                });
                this.setJobPercentagesCompletion();
                if (this.jobId && !this.jobRestarted) {
                    let restartJob;
                    for (let i = 0; i < this.rateImportJobs.length; i++) {
                        if (this.rateImportJobs[i].id === Number(this.jobId)) {
                            restartJob = this.rateImportJobs[i];
                            break;
                        }
                    }
                    this.jobRestarted = true;
                    this.runRestartJob(restartJob);
                }
            },
            err => console.log('Error getting RateImportJobs.', err)
        );
    }

    setJobPercentagesCompletion() {
        this.rateImportJobs.forEach(job => {
            job.totalTasks = job.importRateJobTasks.length;
            job.completedTasks = job.importRateJobTasks.filter(
                task => this.reverseMappingTaskStatus.get(TaskStatus.SUCCESS) === task.status
            ).length;
            job.failedTasks = job.importRateJobTasks.filter(
                task => this.reverseMappingTaskStatus.get(TaskStatus.FAILED) === task.status
            ).length;
            job.percentageCompletion = (job.completedTasks / job.totalTasks) * 100;
            job.percentageFailed = (job.failedTasks / job.totalTasks) * 100;
        });
        if (this.rateImportJobs.length > 0) {
            if (RateImportJobStatus.SUCCESS.toUpperCase() === this.rateImportJobs[0].status) {
                this.loadTariff.emit(this.tariffId);
            }
        }
    }

    jobIsRestartable(job: RateImportJob, index: number) {
        const isFailed = this.reverseMappingRateImportJobStatus.get(RateImportJobStatus.FAILED) === job.status;
        const isMostRecentJob = index === 0;
        return isFailed && isMostRecentJob;
    }

    fixMappings(job: RateImportJob) {
        const failedTask = job.importRateJobTasks.find(task => TaskStatus[task.status] === TaskStatus.FAILED);
        this.importMapping = new ImportMapping();

        if (
            failedTask &&
            (TaskDescription[failedTask.name] === TaskDescription.MAP_RATES ||
                TaskDescription[failedTask.name] === TaskDescription.MAP_TARIFF ||
                TaskDescription[failedTask.name] === TaskDescription.MAP_UTILITY)
        ) {
            this.importMapping.tariffId = job.tariffId;
            this.importMapping.jobId = job.id;
            this.importMapping.externalTariffId = job.externalId;
            this.importMapping.currentMapJobTask = TaskDescription[failedTask.name];
            return true;
        }
        return false;
    }

    restartJob(job: RateImportJob, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.runRestartJob(job);
    }

    runRestartJob(job: RateImportJob) {
        job.status = this.reverseMappingRateImportJobStatus.get(RateImportJobStatus.IN_PROGRESS);
        this.jhiAlertService.addAlert(
            { id: job.id, type: 'info', msg: 'billingWebApp.tariff.rateImportJob.restartingJob', params: { param: job.id } },
            []
        );
        this.rateImportService
            .restartJob(job.id)
            .finally(() => {
                this.getRateImportJobs();
                this.jhiAlertService.closeAlert(job.id);
            })
            .subscribe();
    }

    loadPage(page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.page = page;
            this.getRateImportJobs();
        }
    }
}
