/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { RateChargeMappingComponent } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.component';
import { RateChargeMappingService } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.service';
import { RateChargeMapping } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.model';

describe('Component Tests', () => {
    describe('RateChargeMapping Management Component', () => {
        let comp: RateChargeMappingComponent;
        let fixture: ComponentFixture<RateChargeMappingComponent>;
        let service: RateChargeMappingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateChargeMappingComponent],
                providers: [RateChargeMappingService]
            })
                .overrideTemplate(RateChargeMappingComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateChargeMappingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateChargeMappingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new RateChargeMapping(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rateChargeMappings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
