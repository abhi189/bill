/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { RateUsageTypeMappingComponent } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.component';
import { RateUsageTypeMappingService } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.service';
import { RateUsageTypeMapping } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.model';

describe('Component Tests', () => {
    describe('RateUsageTypeMapping Management Component', () => {
        let comp: RateUsageTypeMappingComponent;
        let fixture: ComponentFixture<RateUsageTypeMappingComponent>;
        let service: RateUsageTypeMappingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateUsageTypeMappingComponent],
                providers: [RateUsageTypeMappingService]
            })
                .overrideTemplate(RateUsageTypeMappingComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateUsageTypeMappingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateUsageTypeMappingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new RateUsageTypeMapping(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rateUsageTypeMappings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
