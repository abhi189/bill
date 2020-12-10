/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { ExcludedRateDetailComponent } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate-detail.component';
import { ExcludedRateService } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate.service';
import { ExcludedRate } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate.model';

describe('Component Tests', () => {
    describe('ExcludedRate Management Detail Component', () => {
        let comp: ExcludedRateDetailComponent;
        let fixture: ComponentFixture<ExcludedRateDetailComponent>;
        let service: ExcludedRateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ExcludedRateDetailComponent],
                providers: [ExcludedRateService]
            })
                .overrideTemplate(ExcludedRateDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExcludedRateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExcludedRateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new ExcludedRate(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.excludedRate).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
