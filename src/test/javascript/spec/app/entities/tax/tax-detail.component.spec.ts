/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { TaxDetailComponent } from '../../../../../../main/webapp/app/entities/tax/tax-detail.component';
import { TaxService } from '../../../../../../main/webapp/app/entities/tax/tax.service';
import { Tax } from '../../../../../../main/webapp/app/entities/tax/tax.model';

describe('Component Tests', () => {
    describe('Tax Management Detail Component', () => {
        let comp: TaxDetailComponent;
        let fixture: ComponentFixture<TaxDetailComponent>;
        let service: TaxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TaxDetailComponent],
                providers: [TaxService]
            })
                .overrideTemplate(TaxDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Tax(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tax).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
