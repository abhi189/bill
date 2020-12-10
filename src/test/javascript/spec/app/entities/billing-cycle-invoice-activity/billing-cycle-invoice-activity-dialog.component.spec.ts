/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleInvoiceActivityDialogComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity-dialog.component';
import { BillingCycleInvoiceActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.service';
import { BillingCycleInvoiceActivity } from '../../../../../../main/webapp/app/entities/billing-cycle-invoice-activity/billing-cycle-invoice-activity.model';
import { BudderflyInvoiceService } from '../../../../../../main/webapp/app/entities/budderfly-invoice';

describe('Component Tests', () => {
    describe('BillingCycleInvoiceActivity Management Dialog Component', () => {
        let comp: BillingCycleInvoiceActivityDialogComponent;
        let fixture: ComponentFixture<BillingCycleInvoiceActivityDialogComponent>;
        let service: BillingCycleInvoiceActivityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleInvoiceActivityDialogComponent],
                providers: [BudderflyInvoiceService, BillingCycleInvoiceActivityService]
            })
                .overrideTemplate(BillingCycleInvoiceActivityDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleInvoiceActivityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleInvoiceActivityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BillingCycleInvoiceActivity(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.billingCycleInvoiceActivity = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'billingCycleInvoiceActivityListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BillingCycleInvoiceActivity();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.billingCycleInvoiceActivity = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'billingCycleInvoiceActivityListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
