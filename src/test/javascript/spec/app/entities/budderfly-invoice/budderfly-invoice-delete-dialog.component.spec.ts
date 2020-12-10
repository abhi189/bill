/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { BudderflyInvoiceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice-delete-dialog.component';
import { BudderflyInvoiceService } from '../../../../../../main/webapp/app/entities/budderfly-invoice/budderfly-invoice.service';

describe('Component Tests', () => {
    describe('BudderflyInvoice Management Delete Component', () => {
        let comp: BudderflyInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<BudderflyInvoiceDeleteDialogComponent>;
        let service: BudderflyInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BudderflyInvoiceDeleteDialogComponent],
                providers: [BudderflyInvoiceService]
            })
                .overrideTemplate(BudderflyInvoiceDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BudderflyInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BudderflyInvoiceService);
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
