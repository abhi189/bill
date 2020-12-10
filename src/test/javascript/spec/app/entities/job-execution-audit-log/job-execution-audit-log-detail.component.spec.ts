/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { JobExecutionAuditLogDetailComponent } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log-detail.component';
import { JobExecutionAuditLogService } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.service';
import { JobExecutionAuditLog } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.model';

describe('Component Tests', () => {
    describe('JobExecutionAuditLog Management Detail Component', () => {
        let comp: JobExecutionAuditLogDetailComponent;
        let fixture: ComponentFixture<JobExecutionAuditLogDetailComponent>;
        let service: JobExecutionAuditLogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [JobExecutionAuditLogDetailComponent],
                providers: [JobExecutionAuditLogService]
            })
                .overrideTemplate(JobExecutionAuditLogDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobExecutionAuditLogDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobExecutionAuditLogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new JobExecutionAuditLog(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobExecutionAuditLog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
