/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { AmuConfigurationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration-delete-dialog.component';
import { AmuConfigurationService } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.service';

describe('Component Tests', () => {
    describe('AmuConfiguration Management Delete Component', () => {
        let comp: AmuConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<AmuConfigurationDeleteDialogComponent>;
        let service: AmuConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AmuConfigurationDeleteDialogComponent],
                providers: [AmuConfigurationService]
            })
                .overrideTemplate(AmuConfigurationDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmuConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmuConfigurationService);
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
