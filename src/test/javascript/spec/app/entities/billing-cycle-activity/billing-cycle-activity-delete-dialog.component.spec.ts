/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { BillingCycleActivityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity-delete-dialog.component';
import { BillingCycleActivityService } from '../../../../../../main/webapp/app/entities/billing-cycle-activity/billing-cycle-activity.service';

describe('Component Tests', () => {
    describe('BillingCycleActivity Management Delete Component', () => {
        let comp: BillingCycleActivityDeleteDialogComponent;
        let fixture: ComponentFixture<BillingCycleActivityDeleteDialogComponent>;
        let service: BillingCycleActivityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [BillingCycleActivityDeleteDialogComponent],
                providers: [BillingCycleActivityService]
            })
                .overrideTemplate(BillingCycleActivityDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillingCycleActivityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillingCycleActivityService);
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
