/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { WebhookEventLoggerComponent } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.component';
import { WebhookEventLoggerService } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.service';
import { WebhookEventLogger } from '../../../../../../main/webapp/app/entities/webhook-event-logger/webhook-event-logger.model';

describe('Component Tests', () => {
    describe('WebhookEventLogger Management Component', () => {
        let comp: WebhookEventLoggerComponent;
        let fixture: ComponentFixture<WebhookEventLoggerComponent>;
        let service: WebhookEventLoggerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [WebhookEventLoggerComponent],
                providers: [WebhookEventLoggerService]
            })
                .overrideTemplate(WebhookEventLoggerComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebhookEventLoggerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebhookEventLoggerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new WebhookEventLogger(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.webhookEventLoggers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
