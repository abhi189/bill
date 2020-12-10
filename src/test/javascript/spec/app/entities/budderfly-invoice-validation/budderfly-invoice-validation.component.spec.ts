/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { BudderflyInvoiceValidationComponent } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation.component';
import { BudderflyInvoiceValidationService } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation.service';
import { BudderflyInvoiceValidation } from '../../../../../../main/webapp/app/entities/budderfly-invoice-validation/budderfly-invoice-validation.model';

describe('Component Tests', () => {
    describe('BudderflyInvoiceValidation Management Component', () => {
        let comp: BudderflyInvoiceValidationComponent;
        let fixture: ComponentFixture<BudderflyInvoiceValidationComponent>;
        let service: BudderflyInvoiceValidationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BudderflyInvoiceValidationComponent],
                providers: [BudderflyInvoiceValidationService]
            })
                .overrideTemplate(BudderflyInvoiceValidationComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudderflyInvoiceValidationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudderflyInvoiceValidationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new BudderflyInvoiceValidation(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.budderflyInvoiceValidations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
