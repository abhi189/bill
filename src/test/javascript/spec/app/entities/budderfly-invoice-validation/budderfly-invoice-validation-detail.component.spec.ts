/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { BudderflyInvoiceValidationDetailComponent } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation-detail.component';
import { BudderflyInvoiceValidationService } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation.service';
import { BudderflyInvoiceValidation } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation.model';

describe('Component Tests', () => {
    describe('BudderflyInvoiceValidation Management Detail Component', () => {
        let comp: BudderflyInvoiceValidationDetailComponent;
        let fixture: ComponentFixture<BudderflyInvoiceValidationDetailComponent>;
        let service: BudderflyInvoiceValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BudderflyInvoiceValidationDetailComponent],
                providers: [BudderflyInvoiceValidationService]
            })
                .overrideTemplate(BudderflyInvoiceValidationDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudderflyInvoiceValidationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudderflyInvoiceValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new BudderflyInvoiceValidation(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.budderflyInvoiceValidation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
