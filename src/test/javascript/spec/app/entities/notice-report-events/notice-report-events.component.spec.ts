/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { NoticeReportEventsComponent } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events.component';
import { NoticeReportEventsService } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events.service';
import { NoticeReportEvents } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events.model';

describe('Component Tests', () => {
    describe('NoticeReportEvents Management Component', () => {
        let comp: NoticeReportEventsComponent;
        let fixture: ComponentFixture<NoticeReportEventsComponent>;
        let service: NoticeReportEventsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [NoticeReportEventsComponent],
                providers: [NoticeReportEventsService]
            })
                .overrideTemplate(NoticeReportEventsComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoticeReportEventsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeReportEventsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new NoticeReportEvents(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.noticeReportEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
