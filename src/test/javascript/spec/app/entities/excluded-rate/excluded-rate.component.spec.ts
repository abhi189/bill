/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { ExcludedRateComponent } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate.component';
import { ExcludedRateService } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate.service';
import { ExcludedRate } from '../../../../../../main/webapp/app/entities/excluded-rate/excluded-rate.model';

describe('Component Tests', () => {
    describe('ExcludedRate Management Component', () => {
        let comp: ExcludedRateComponent;
        let fixture: ComponentFixture<ExcludedRateComponent>;
        let service: ExcludedRateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ExcludedRateComponent],
                providers: [ExcludedRateService]
            })
                .overrideTemplate(ExcludedRateComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExcludedRateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExcludedRateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new ExcludedRate(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.excludedRates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
