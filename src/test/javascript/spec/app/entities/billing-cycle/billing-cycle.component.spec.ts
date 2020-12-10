/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleComponent } from '../../../../../../main/webapp/app/entities/billing-cycle/billing-cycle.component';
import { BillingCycleService } from '../../../../../../main/webapp/app/entities/billing-cycle/billing-cycle.service';
import { BillingCycle } from '../../../../../../main/webapp/app/entities/billing-cycle/billing-cycle.model';

describe('Component Tests', () => {
    describe('BillingCycle Management Component', () => {
        let comp: BillingCycleComponent;
        let fixture: ComponentFixture<BillingCycleComponent>;
        let service: BillingCycleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleComponent],
                providers: [BillingCycleService]
            })
                .overrideTemplate(BillingCycleComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new BillingCycle(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billingCycles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
