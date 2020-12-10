/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { StagingChargeDialogComponent } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge-dialog.component';
import { StagingChargeService } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.service';
import { StagingCharge } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.model';
import { StagingInvoiceService } from '../../../../../../main/webapp/app/entities/staging-invoice';
import { StagingMeterService } from '../../../../../../main/webapp/app/entities/staging-meter';

describe('Component Tests', () => {
    describe('StagingCharge Management Dialog Component', () => {
        let comp: StagingChargeDialogComponent;
        let fixture: ComponentFixture<StagingChargeDialogComponent>;
        let service: StagingChargeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingChargeDialogComponent],
                providers: [StagingInvoiceService, StagingMeterService, StagingChargeService]
            })
                .overrideTemplate(StagingChargeDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingChargeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingChargeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StagingCharge(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.stagingCharge = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stagingChargeListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StagingCharge();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.stagingCharge = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stagingChargeListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
