/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { DiscountComponent } from '../../../../../../main/webapp/app/entities/discount/discount.component';
import { DiscountService } from '../../../../../../main/webapp/app/entities/discount/discount.service';
import { Discount } from '../../../../../../main/webapp/app/entities/discount/discount.model';

describe('Component Tests', () => {
    describe('Discount Management Component', () => {
        let comp: DiscountComponent;
        let fixture: ComponentFixture<DiscountComponent>;
        let service: DiscountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [DiscountComponent],
                providers: [DiscountService]
            })
                .overrideTemplate(DiscountComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Discount(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.discounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
