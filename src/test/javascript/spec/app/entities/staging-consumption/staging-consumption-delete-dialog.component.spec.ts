/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { StagingConsumptionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption-delete-dialog.component';
import { StagingConsumptionService } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.service';

describe('Component Tests', () => {
    describe('StagingConsumption Management Delete Component', () => {
        let comp: StagingConsumptionDeleteDialogComponent;
        let fixture: ComponentFixture<StagingConsumptionDeleteDialogComponent>;
        let service: StagingConsumptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingConsumptionDeleteDialogComponent],
                providers: [StagingConsumptionService]
            })
                .overrideTemplate(StagingConsumptionDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingConsumptionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingConsumptionService);
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
