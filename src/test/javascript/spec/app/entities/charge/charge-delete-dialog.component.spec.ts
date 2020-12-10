/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { ChargeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/charge/charge-delete-dialog.component';
import { ChargeService } from '../../../../../../main/webapp/app/entities/charge/charge.service';

describe('Component Tests', () => {
    describe('Charge Management Delete Component', () => {
        let comp: ChargeDeleteDialogComponent;
        let fixture: ComponentFixture<ChargeDeleteDialogComponent>;
        let service: ChargeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ChargeDeleteDialogComponent],
                providers: [ChargeService]
            })
                .overrideTemplate(ChargeDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChargeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
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
