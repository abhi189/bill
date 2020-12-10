/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { StagingConsumptionDialogComponent } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption-dialog.component';
import { StagingConsumptionService } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.service';
import { StagingConsumption } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.model';
import { StagingInvoiceService } from '../../../../../../main/webapp/app/entities/staging-invoice';
import { StagingMeterService } from '../../../../../../main/webapp/app/entities/staging-meter';

describe('Component Tests', () => {
    describe('StagingConsumption Management Dialog Component', () => {
        let comp: StagingConsumptionDialogComponent;
        let fixture: ComponentFixture<StagingConsumptionDialogComponent>;
        let service: StagingConsumptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingConsumptionDialogComponent],
                providers: [StagingInvoiceService, StagingMeterService, StagingConsumptionService]
            })
                .overrideTemplate(StagingConsumptionDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingConsumptionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingConsumptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StagingConsumption(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.stagingConsumption = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'stagingConsumptionListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StagingConsumption();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.stagingConsumption = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'stagingConsumptionListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
