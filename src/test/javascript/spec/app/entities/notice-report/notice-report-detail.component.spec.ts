/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { NoticeReportDetailComponent } from '../../../../../../main/webapp/app/entities/notice-report/notice-report-detail.component';
import { NoticeReportService } from '../../../../../../main/webapp/app/entities/notice-report/notice-report.service';
import { NoticeReport } from '../../../../../../main/webapp/app/entities/notice-report/notice-report.model';

describe('Component Tests', () => {
    describe('NoticeReport Management Detail Component', () => {
        let comp: NoticeReportDetailComponent;
        let fixture: ComponentFixture<NoticeReportDetailComponent>;
        let service: NoticeReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [NoticeReportDetailComponent],
                providers: [NoticeReportService]
            })
                .overrideTemplate(NoticeReportDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoticeReportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new NoticeReport(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.noticeReport).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
