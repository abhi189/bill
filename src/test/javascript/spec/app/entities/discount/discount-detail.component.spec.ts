/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { DiscountDetailComponent } from '../../../../../../main/webapp/app/entities/discount/discount-detail.component';
import { DiscountService } from '../../../../../../main/webapp/app/entities/discount/discount.service';
import { Discount } from '../../../../../../main/webapp/app/entities/discount/discount.model';

describe('Component Tests', () => {
    describe('Discount Management Detail Component', () => {
        let comp: DiscountDetailComponent;
        let fixture: ComponentFixture<DiscountDetailComponent>;
        let service: DiscountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [DiscountDetailComponent],
                providers: [DiscountService]
            })
                .overrideTemplate(DiscountDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Discount(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.discount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
