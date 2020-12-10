/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleActivityComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.component';
import { BillingCycleActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.service';
import { BillingCycleActivity } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.model';

describe('Component Tests', () => {
    describe('BillingCycleActivity Management Component', () => {
        let comp: BillingCycleActivityComponent;
        let fixture: ComponentFixture<BillingCycleActivityComponent>;
        let service: BillingCycleActivityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleActivityComponent],
                providers: [BillingCycleActivityService]
            })
                .overrideTemplate(BillingCycleActivityComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleActivityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleActivityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new BillingCycleActivity(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billingCycleActivities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
