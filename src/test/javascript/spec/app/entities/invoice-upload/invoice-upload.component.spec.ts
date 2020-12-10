/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { InvoiceUploadComponent } from '../../../../../../main/webapp/app/entities/invoice-upload/invoice-upload.component';
import { InvoiceUploadService } from '../../../../../../main/webapp/app/entities/invoice-upload/invoice-upload.service';
import { InvoiceUpload } from '../../../../../../main/webapp/app/entities/invoice-upload/invoice-upload.model';

describe('Component Tests', () => {
    describe('InvoiceUpload Management Component', () => {
        let comp: InvoiceUploadComponent;
        let fixture: ComponentFixture<InvoiceUploadComponent>;
        let service: InvoiceUploadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [InvoiceUploadComponent],
                providers: [InvoiceUploadService]
            })
                .overrideTemplate(InvoiceUploadComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceUploadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceUploadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new InvoiceUpload(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoiceUploads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
