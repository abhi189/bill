/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { NoticeReportEventsDetailComponent } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events-detail.component';
import { NoticeReportEventsService } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events.service';
import { NoticeReportEvents } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-events/notice-report-events.model';

describe('Component Tests', () => {
    describe('NoticeReportEvents Management Detail Component', () => {
        let comp: NoticeReportEventsDetailComponent;
        let fixture: ComponentFixture<NoticeReportEventsDetailComponent>;
        let service: NoticeReportEventsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [NoticeReportEventsDetailComponent],
                providers: [NoticeReportEventsService]
            })
                .overrideTemplate(NoticeReportEventsDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoticeReportEventsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeReportEventsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new NoticeReportEvents(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.noticeReportEvents).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
