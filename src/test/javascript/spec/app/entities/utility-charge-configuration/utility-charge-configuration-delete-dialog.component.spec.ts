/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityChargeConfigurationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration-delete-dialog.component';
import { UtilityChargeConfigurationService } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.service';

describe('Component Tests', () => {
    describe('UtilityChargeConfiguration Management Delete Component', () => {
        let comp: UtilityChargeConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<UtilityChargeConfigurationDeleteDialogComponent>;
        let service: UtilityChargeConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityChargeConfigurationDeleteDialogComponent],
                providers: [UtilityChargeConfigurationService]
            })
                .overrideTemplate(UtilityChargeConfigurationDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityChargeConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityChargeConfigurationService);
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
