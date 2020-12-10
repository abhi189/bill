/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateComponentMappingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping-delete-dialog.component';
import { RateComponentMappingService } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.service';

describe('Component Tests', () => {
    describe('RateComponentMapping Management Delete Component', () => {
        let comp: RateComponentMappingDeleteDialogComponent;
        let fixture: ComponentFixture<RateComponentMappingDeleteDialogComponent>;
        let service: RateComponentMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateComponentMappingDeleteDialogComponent],
                providers: [RateComponentMappingService]
            })
                .overrideTemplate(RateComponentMappingDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateComponentMappingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateComponentMappingService);
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
