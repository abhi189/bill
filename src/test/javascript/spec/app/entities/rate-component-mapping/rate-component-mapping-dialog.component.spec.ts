/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateComponentMappingDialogComponent } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping-dialog.component';
import { RateComponentMappingService } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.service';
import { RateComponentMapping } from '../../../../../../main/webapp/app/entities/rate-component-mapping/rate-component-mapping.model';
import { ProviderService } from '../../../../../../main/webapp/app/entities/provider';

describe('Component Tests', () => {
    describe('RateComponentMapping Management Dialog Component', () => {
        let comp: RateComponentMappingDialogComponent;
        let fixture: ComponentFixture<RateComponentMappingDialogComponent>;
        let service: RateComponentMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateComponentMappingDialogComponent],
                providers: [ProviderService, RateComponentMappingService]
            })
                .overrideTemplate(RateComponentMappingDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateComponentMappingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateComponentMappingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateComponentMapping(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateComponentMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateComponentMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateComponentMapping();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateComponentMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateComponentMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
