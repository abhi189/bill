/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { MissingInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice-detail.component';
import { MissingInvoiceService } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.service';
import { MissingInvoice } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.model';

describe('Component Tests', () => {
    describe('MissingInvoice Management Detail Component', () => {
        let comp: MissingInvoiceDetailComponent;
        let fixture: ComponentFixture<MissingInvoiceDetailComponent>;
        let service: MissingInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [MissingInvoiceDetailComponent],
                providers: [MissingInvoiceService]
            })
                .overrideTemplate(MissingInvoiceDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MissingInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissingInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new MissingInvoice(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.missingInvoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
