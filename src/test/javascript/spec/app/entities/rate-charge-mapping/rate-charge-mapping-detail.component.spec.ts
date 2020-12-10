/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { RateChargeMappingDetailComponent } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping-detail.component';
import { RateChargeMappingService } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.service';
import { RateChargeMapping } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.model';

describe('Component Tests', () => {
    describe('RateChargeMapping Management Detail Component', () => {
        let comp: RateChargeMappingDetailComponent;
        let fixture: ComponentFixture<RateChargeMappingDetailComponent>;
        let service: RateChargeMappingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateChargeMappingDetailComponent],
                providers: [RateChargeMappingService]
            })
                .overrideTemplate(RateChargeMappingDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateChargeMappingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateChargeMappingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new RateChargeMapping(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rateChargeMapping).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
