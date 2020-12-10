/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { JobExecutionAuditLogDialogComponent } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log-dialog.component';
import { JobExecutionAuditLogService } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.service';
import { JobExecutionAuditLog } from '../../../../../../main/webapp/app/entities/job-execution-audit-log/job-execution-audit-log.model';
import { JobDescriptionService } from '../../../../../../main/webapp/app/admin/job-description/job-description.service';

describe('Component Tests', () => {
    describe('JobExecutionAuditLog Management Dialog Component', () => {
        let comp: JobExecutionAuditLogDialogComponent;
        let fixture: ComponentFixture<JobExecutionAuditLogDialogComponent>;
        let service: JobExecutionAuditLogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [JobExecutionAuditLogDialogComponent],
                providers: [JobDescriptionService, JobExecutionAuditLogService]
            })
                .overrideTemplate(JobExecutionAuditLogDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobExecutionAuditLogDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobExecutionAuditLogService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobExecutionAuditLog(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.jobExecutionAuditLog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'jobExecutionAuditLogListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JobExecutionAuditLog();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.jobExecutionAuditLog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'jobExecutionAuditLogListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
