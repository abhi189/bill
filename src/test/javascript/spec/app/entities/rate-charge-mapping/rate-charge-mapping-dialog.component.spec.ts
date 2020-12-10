/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateChargeMappingDialogComponent } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping-dialog.component';
import { RateChargeMappingService } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.service';
import { RateChargeMapping } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.model';
import { ProviderService } from '../../../../../../main/webapp/app/entities/provider';

describe('Component Tests', () => {
    describe('RateChargeMapping Management Dialog Component', () => {
        let comp: RateChargeMappingDialogComponent;
        let fixture: ComponentFixture<RateChargeMappingDialogComponent>;
        let service: RateChargeMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateChargeMappingDialogComponent],
                providers: [ProviderService, RateChargeMappingService]
            })
                .overrideTemplate(RateChargeMappingDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateChargeMappingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateChargeMappingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateChargeMapping(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateChargeMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateChargeMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateChargeMapping();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateChargeMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateChargeMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
