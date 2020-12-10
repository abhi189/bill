/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { RateUsageTypeMappingDetailComponent } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping-detail.component';
import { RateUsageTypeMappingService } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.service';
import { RateUsageTypeMapping } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.model';

describe('Component Tests', () => {
    describe('RateUsageTypeMapping Management Detail Component', () => {
        let comp: RateUsageTypeMappingDetailComponent;
        let fixture: ComponentFixture<RateUsageTypeMappingDetailComponent>;
        let service: RateUsageTypeMappingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateUsageTypeMappingDetailComponent],
                providers: [RateUsageTypeMappingService]
            })
                .overrideTemplate(RateUsageTypeMappingDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateUsageTypeMappingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateUsageTypeMappingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new RateUsageTypeMapping(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rateUsageTypeMapping).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
