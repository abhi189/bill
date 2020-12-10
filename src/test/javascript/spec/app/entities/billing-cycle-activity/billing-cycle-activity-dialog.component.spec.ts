/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleActivityDialogComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity-dialog.component';
import { BillingCycleActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.service';
import { BillingCycleActivity } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.model';
import { BillingCycleService } from '../../../../../../main/webapp/app/entities/billing-cycle';

describe('Component Tests', () => {
    describe('BillingCycleActivity Management Dialog Component', () => {
        let comp: BillingCycleActivityDialogComponent;
        let fixture: ComponentFixture<BillingCycleActivityDialogComponent>;
        let service: BillingCycleActivityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleActivityDialogComponent],
                providers: [BillingCycleService, BillingCycleActivityService]
            })
                .overrideTemplate(BillingCycleActivityDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleActivityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleActivityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BillingCycleActivity(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.billingCycleActivity = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'billingCycleActivityListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BillingCycleActivity();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.billingCycleActivity = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'billingCycleActivityListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
