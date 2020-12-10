/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { WebhookEventLoggerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger-delete-dialog.component';
import { WebhookEventLoggerService } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.service';

describe('Component Tests', () => {
    describe('WebhookEventLogger Management Delete Component', () => {
        let comp: WebhookEventLoggerDeleteDialogComponent;
        let fixture: ComponentFixture<WebhookEventLoggerDeleteDialogComponent>;
        let service: WebhookEventLoggerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [WebhookEventLoggerDeleteDialogComponent],
                providers: [WebhookEventLoggerService]
            })
                .overrideTemplate(WebhookEventLoggerDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebhookEventLoggerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebhookEventLoggerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(Observable.of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
