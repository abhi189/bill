/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleActivityDetailComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity-detail.component';
import { BillingCycleActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.service';
import { BillingCycleActivity } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.model';

describe('Component Tests', () => {
    describe('BillingCycleActivity Management Detail Component', () => {
        let comp: BillingCycleActivityDetailComponent;
        let fixture: ComponentFixture<BillingCycleActivityDetailComponent>;
        let service: BillingCycleActivityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleActivityDetailComponent],
                providers: [BillingCycleActivityService]
            })
                .overrideTemplate(BillingCycleActivityDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleActivityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleActivityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new BillingCycleActivity(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.billingCycleActivity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
