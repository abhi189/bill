/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { NoticeReportComponent } from '../../../../../../main/webapp/app/entities/notice-report/notice-report.component';
import { NoticeReportService } from '../../../../../../main/webapp/app/entities/notice-report/notice-report.service';
import { NoticeReport } from '../../../../../../main/webapp/app/entities/notice-report/notice-report.model';

describe('Component Tests', () => {
    describe('NoticeReport Management Component', () => {
        let comp: NoticeReportComponent;
        let fixture: ComponentFixture<NoticeReportComponent>;
        let service: NoticeReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [NoticeReportComponent],
                providers: [NoticeReportService]
            })
                .overrideTemplate(NoticeReportComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoticeReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoticeReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new NoticeReport(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.noticeReports[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
