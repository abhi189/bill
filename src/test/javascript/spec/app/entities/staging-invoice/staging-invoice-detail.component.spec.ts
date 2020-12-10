/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { StagingInvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice-detail.component';
import { StagingInvoiceService } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.service';
import { StagingInvoice } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.model';

describe('Component Tests', () => {
    describe('StagingInvoice Management Detail Component', () => {
        let comp: StagingInvoiceDetailComponent;
        let fixture: ComponentFixture<StagingInvoiceDetailComponent>;
        let service: StagingInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingInvoiceDetailComponent],
                providers: [StagingInvoiceService]
            })
                .overrideTemplate(StagingInvoiceDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingInvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new StagingInvoice(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stagingInvoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
