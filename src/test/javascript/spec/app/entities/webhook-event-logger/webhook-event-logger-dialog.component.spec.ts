/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { WebhookEventLoggerDialogComponent } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger-dialog.component';
import { WebhookEventLoggerService } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.service';
import { WebhookEventLogger } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.model';

describe('Component Tests', () => {
    describe('WebhookEventLogger Management Dialog Component', () => {
        let comp: WebhookEventLoggerDialogComponent;
        let fixture: ComponentFixture<WebhookEventLoggerDialogComponent>;
        let service: WebhookEventLoggerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [WebhookEventLoggerDialogComponent],
                providers: [WebhookEventLoggerService]
            })
                .overrideTemplate(WebhookEventLoggerDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebhookEventLoggerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebhookEventLoggerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WebhookEventLogger(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.webhookEventLogger = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'webhookEventLoggerListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WebhookEventLogger();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.webhookEventLogger = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'webhookEventLoggerListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
