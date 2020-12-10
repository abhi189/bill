/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { BudderflyInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice-detail.component';
import { BudderflyInvoiceService } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.service';
import { BudderflyInvoice } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.model';

describe('Component Tests', () => {
    describe('BudderflyInvoice Management Detail Component', () => {
        let comp: BudderflyInvoiceDetailComponent;
        let fixture: ComponentFixture<BudderflyInvoiceDetailComponent>;
        let service: BudderflyInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BudderflyInvoiceDetailComponent],
                providers: [BudderflyInvoiceService]
            })
                .overrideTemplate(BudderflyInvoiceDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudderflyInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudderflyInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new BudderflyInvoice(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.budderflyInvoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
