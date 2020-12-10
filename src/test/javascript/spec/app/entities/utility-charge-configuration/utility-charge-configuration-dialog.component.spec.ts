/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityChargeConfigurationDialogComponent } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration-dialog.component';
import { UtilityChargeConfigurationService } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.service';
import { UtilityChargeConfiguration } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.model';

describe('Component Tests', () => {
    describe('UtilityChargeConfiguration Management Dialog Component', () => {
        let comp: UtilityChargeConfigurationDialogComponent;
        let fixture: ComponentFixture<UtilityChargeConfigurationDialogComponent>;
        let service: UtilityChargeConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityChargeConfigurationDialogComponent],
                providers: [UtilityChargeConfigurationService]
            })
                .overrideTemplate(UtilityChargeConfigurationDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityChargeConfigurationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityChargeConfigurationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UtilityChargeConfiguration(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.utilityChargeConfiguration = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'utilityChargeConfigurationListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UtilityChargeConfiguration();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.utilityChargeConfiguration = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'utilityChargeConfigurationListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
