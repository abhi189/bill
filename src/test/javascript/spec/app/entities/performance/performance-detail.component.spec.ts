/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { PerformanceDetailComponent } from '../../../../../../main/webapp/app/entities/performance/performance-detail.component';
import { PerformanceService } from '../../../../../../main/webapp/app/entities/performance/performance.service';
import { Performance } from '../../../../../../main/webapp/app/entities/performance/performance.model';

describe('Component Tests', () => {
    describe('Performance Management Detail Component', () => {
        let comp: PerformanceDetailComponent;
        let fixture: ComponentFixture<PerformanceDetailComponent>;
        let service: PerformanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [PerformanceDetailComponent],
                providers: [PerformanceService]
            })
                .overrideTemplate(PerformanceDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PerformanceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerformanceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Performance(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.performance).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
