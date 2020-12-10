/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateUsageTypeMappingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping-delete-dialog.component';
import { RateUsageTypeMappingService } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.service';

describe('Component Tests', () => {
    describe('RateUsageTypeMapping Management Delete Component', () => {
        let comp: RateUsageTypeMappingDeleteDialogComponent;
        let fixture: ComponentFixture<RateUsageTypeMappingDeleteDialogComponent>;
        let service: RateUsageTypeMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateUsageTypeMappingDeleteDialogComponent],
                providers: [RateUsageTypeMappingService]
            })
                .overrideTemplate(RateUsageTypeMappingDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateUsageTypeMappingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateUsageTypeMappingService);
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
