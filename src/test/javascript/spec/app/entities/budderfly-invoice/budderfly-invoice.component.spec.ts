/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { BudderflyInvoiceComponent } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.component';
import { BudderflyInvoiceService } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.service';
import { BudderflyInvoice } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.model';

describe('Component Tests', () => {
    describe('BudderflyInvoice Management Component', () => {
        let comp: BudderflyInvoiceComponent;
        let fixture: ComponentFixture<BudderflyInvoiceComponent>;
        let service: BudderflyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BudderflyInvoiceComponent],
                providers: [BudderflyInvoiceService]
            })
                .overrideTemplate(BudderflyInvoiceComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudderflyInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudderflyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new BudderflyInvoice(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.budderflyInvoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
