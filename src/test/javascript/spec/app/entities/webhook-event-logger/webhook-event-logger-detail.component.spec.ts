/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { WebhookEventLoggerDetailComponent } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger-detail.component';
import { WebhookEventLoggerService } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.service';
import { WebhookEventLogger } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.model';

describe('Component Tests', () => {
    describe('WebhookEventLogger Management Detail Component', () => {
        let comp: WebhookEventLoggerDetailComponent;
        let fixture: ComponentFixture<WebhookEventLoggerDetailComponent>;
        let service: WebhookEventLoggerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [WebhookEventLoggerDetailComponent],
                providers: [WebhookEventLoggerService]
            })
                .overrideTemplate(WebhookEventLoggerDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebhookEventLoggerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebhookEventLoggerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new WebhookEventLogger(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.webhookEventLogger).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
