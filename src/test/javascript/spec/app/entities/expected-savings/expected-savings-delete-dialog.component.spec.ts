/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { ExpectedSavingsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/expected-savings/expected-savings-delete-dialog.component';
import { ExpectedSavingsService } from '../../../../../../main/webapp/app/entities/expected-savings/expected-savings.service';

describe('Component Tests', () => {
    describe('ExpectedSavings Management Delete Component', () => {
        let comp: ExpectedSavingsDeleteDialogComponent;
        let fixture: ComponentFixture<ExpectedSavingsDeleteDialogComponent>;
        let service: ExpectedSavingsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ExpectedSavingsDeleteDialogComponent],
                providers: [ExpectedSavingsService]
            })
                .overrideTemplate(ExpectedSavingsDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpectedSavingsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpectedSavingsService);
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
