/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleInvoiceActivityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity-delete-dialog.component';
import { BillingCycleInvoiceActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.service';

describe('Component Tests', () => {
    describe('BillingCycleInvoiceActivity Management Delete Component', () => {
        let comp: BillingCycleInvoiceActivityDeleteDialogComponent;
        let fixture: ComponentFixture<BillingCycleInvoiceActivityDeleteDialogComponent>;
        let service: BillingCycleInvoiceActivityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleInvoiceActivityDeleteDialogComponent],
                providers: [BillingCycleInvoiceActivityService]
            })
                .overrideTemplate(BillingCycleInvoiceActivityDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleInvoiceActivityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleInvoiceActivityService);
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
