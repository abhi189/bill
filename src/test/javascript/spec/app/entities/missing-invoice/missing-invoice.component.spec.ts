/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { MissingInvoiceComponent } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.component';
import { MissingInvoiceService } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.service';
import { MissingInvoice } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.model';

describe('Component Tests', () => {
    describe('MissingInvoice Management Component', () => {
        let comp: MissingInvoiceComponent;
        let fixture: ComponentFixture<MissingInvoiceComponent>;
        let service: MissingInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [MissingInvoiceComponent],
                providers: [MissingInvoiceService]
            })
                .overrideTemplate(MissingInvoiceComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MissingInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissingInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new MissingInvoice(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.missingInvoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
