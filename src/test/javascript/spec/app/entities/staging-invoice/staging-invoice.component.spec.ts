/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { StagingInvoiceComponent } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.component';
import { StagingInvoiceService } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.service';
import { StagingInvoice } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.model';

describe('Component Tests', () => {
    describe('StagingInvoice Management Component', () => {
        let comp: StagingInvoiceComponent;
        let fixture: ComponentFixture<StagingInvoiceComponent>;
        let service: StagingInvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingInvoiceComponent],
                providers: [StagingInvoiceService]
            })
                .overrideTemplate(StagingInvoiceComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingInvoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingInvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new StagingInvoice(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stagingInvoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
