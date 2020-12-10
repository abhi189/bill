/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleInvoiceActivityComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.component';
import { BillingCycleInvoiceActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.service';
import { BillingCycleInvoiceActivity } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.model';

describe('Component Tests', () => {
    describe('BillingCycleInvoiceActivity Management Component', () => {
        let comp: BillingCycleInvoiceActivityComponent;
        let fixture: ComponentFixture<BillingCycleInvoiceActivityComponent>;
        let service: BillingCycleInvoiceActivityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleInvoiceActivityComponent],
                providers: [BillingCycleInvoiceActivityService]
            })
                .overrideTemplate(BillingCycleInvoiceActivityComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleInvoiceActivityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleInvoiceActivityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new BillingCycleInvoiceActivity(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billingCycleInvoiceActivities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
