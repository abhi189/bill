/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateChargeMappingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping-delete-dialog.component';
import { RateChargeMappingService } from '../../../../../../main/webapp/app/entities/rate-charge-mapping/rate-charge-mapping.service';

describe('Component Tests', () => {
    describe('RateChargeMapping Management Delete Component', () => {
        let comp: RateChargeMappingDeleteDialogComponent;
        let fixture: ComponentFixture<RateChargeMappingDeleteDialogComponent>;
        let service: RateChargeMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateChargeMappingDeleteDialogComponent],
                providers: [RateChargeMappingService]
            })
                .overrideTemplate(RateChargeMappingDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateChargeMappingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateChargeMappingService);
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
