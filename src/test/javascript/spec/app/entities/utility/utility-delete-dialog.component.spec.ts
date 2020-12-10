/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/utility/utility-delete-dialog.component';
import { UtilityService } from '../../../../../../main/webapp/app/entities/utility/utility.service';

describe('Component Tests', () => {
    describe('Utility Management Delete Component', () => {
        let comp: UtilityDeleteDialogComponent;
        let fixture: ComponentFixture<UtilityDeleteDialogComponent>;
        let service: UtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityDeleteDialogComponent],
                providers: [UtilityService]
            })
                .overrideTemplate(UtilityDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityService);
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
