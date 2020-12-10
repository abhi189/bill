/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { PerformanceComponent } from '../../../../../../main/webapp/app/entities/performance/performance.component';
import { PerformanceService } from '../../../../../../main/webapp/app/entities/performance/performance.service';
import { Performance } from '../../../../../../main/webapp/app/entities/performance/performance.model';

describe('Component Tests', () => {
    describe('Performance Management Component', () => {
        let comp: PerformanceComponent;
        let fixture: ComponentFixture<PerformanceComponent>;
        let service: PerformanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [PerformanceComponent],
                providers: [PerformanceService]
            })
                .overrideTemplate(PerformanceComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PerformanceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerformanceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Performance(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.performances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
