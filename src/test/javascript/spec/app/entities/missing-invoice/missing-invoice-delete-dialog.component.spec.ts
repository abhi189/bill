/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { MissingInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice-delete-dialog.component';
import { MissingInvoiceService } from '../../../../../../main/webapp/app/entities/missing-invoice/missing-invoice.service';

describe('Component Tests', () => {
    describe('MissingInvoice Management Delete Component', () => {
        let comp: MissingInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<MissingInvoiceDeleteDialogComponent>;
        let service: MissingInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [MissingInvoiceDeleteDialogComponent],
                providers: [MissingInvoiceService]
            })
                .overrideTemplate(MissingInvoiceDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MissingInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissingInvoiceService);
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
