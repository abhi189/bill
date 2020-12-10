/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { JobExecutionAuditLogComponent } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.component';
import { JobExecutionAuditLogService } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.service';
import { JobExecutionAuditLog } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.model';

describe('Component Tests', () => {
    describe('JobExecutionAuditLog Management Component', () => {
        let comp: JobExecutionAuditLogComponent;
        let fixture: ComponentFixture<JobExecutionAuditLogComponent>;
        let service: JobExecutionAuditLogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [JobExecutionAuditLogComponent],
                providers: [JobExecutionAuditLogService]
            })
                .overrideTemplate(JobExecutionAuditLogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobExecutionAuditLogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobExecutionAuditLogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new JobExecutionAuditLog(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobExecutionAuditLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
