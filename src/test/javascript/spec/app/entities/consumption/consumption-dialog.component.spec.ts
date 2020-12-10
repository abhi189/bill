/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { ConsumptionDialogComponent } from '../../../../../../main/webapp/app/entities/consumption/consumption-dialog.component';
import { ConsumptionService } from '../../../../../../main/webapp/app/entities/consumption/consumption.service';
import { Consumption } from '../../../../../../main/webapp/app/entities/consumption/consumption.model';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice';

describe('Component Tests', () => {
    describe('Consumption Management Dialog Component', () => {
        let comp: ConsumptionDialogComponent;
        let fixture: ComponentFixture<ConsumptionDialogComponent>;
        let service: ConsumptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ConsumptionDialogComponent],
                providers: [InvoiceService, ConsumptionService]
            })
                .overrideTemplate(ConsumptionDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsumptionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consumption(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consumption = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'consumptionListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consumption();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consumption = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'consumptionListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
