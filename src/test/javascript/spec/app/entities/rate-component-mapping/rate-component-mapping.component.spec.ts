/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { RateComponentMappingComponent } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.component';
import { RateComponentMappingService } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.service';
import { RateComponentMapping } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.model';

describe('Component Tests', () => {
    describe('RateComponentMapping Management Component', () => {
        let comp: RateComponentMappingComponent;
        let fixture: ComponentFixture<RateComponentMappingComponent>;
        let service: RateComponentMappingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateComponentMappingComponent],
                providers: [RateComponentMappingService]
            })
                .overrideTemplate(RateComponentMappingComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateComponentMappingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateComponentMappingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new RateComponentMapping(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rateComponentMappings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
