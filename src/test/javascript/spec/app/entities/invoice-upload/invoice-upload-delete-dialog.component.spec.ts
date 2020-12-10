/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { InvoiceUploadDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/invoice-upload/invoice-upload-delete-dialog.component';
import { InvoiceUploadService } from '../../../../../../main/webapp/app/entities/invoice-upload/invoice-upload.service';

describe('Component Tests', () => {
    describe('InvoiceUpload Management Delete Component', () => {
        let comp: InvoiceUploadDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceUploadDeleteDialogComponent>;
        let service: InvoiceUploadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [InvoiceUploadDeleteDialogComponent],
                providers: [InvoiceUploadService]
            })
                .overrideTemplate(InvoiceUploadDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceUploadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceUploadService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(Observable.of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
