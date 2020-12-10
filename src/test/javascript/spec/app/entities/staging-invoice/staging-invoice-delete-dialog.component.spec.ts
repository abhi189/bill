/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { StagingInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice-delete-dialog.component';
import { StagingInvoiceService } from '../../../../../../main/webapp/app/entities/staging-invoice/staging-invoice.service';

describe('Component Tests', () => {
    describe('StagingInvoice Management Delete Component', () => {
        let comp: StagingInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<StagingInvoiceDeleteDialogComponent>;
        let service: StagingInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingInvoiceDeleteDialogComponent],
                providers: [StagingInvoiceService]
            })
                .overrideTemplate(StagingInvoiceDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingInvoiceService);
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
