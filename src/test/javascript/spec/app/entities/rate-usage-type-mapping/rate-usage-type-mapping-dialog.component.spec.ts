/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { RateUsageTypeMappingDialogComponent } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping-dialog.component';
import { RateUsageTypeMappingService } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.service';
import { RateUsageTypeMapping } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.model';
import { ProviderService } from '../../../../../../main/webapp/app/entities/provider';

describe('Component Tests', () => {
    describe('RateUsageTypeMapping Management Dialog Component', () => {
        let comp: RateUsageTypeMappingDialogComponent;
        let fixture: ComponentFixture<RateUsageTypeMappingDialogComponent>;
        let service: RateUsageTypeMappingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [RateUsageTypeMappingDialogComponent],
                providers: [ProviderService, RateUsageTypeMappingService]
            })
                .overrideTemplate(RateUsageTypeMappingDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateUsageTypeMappingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateUsageTypeMappingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateUsageTypeMapping(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateUsageTypeMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateUsageTypeMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RateUsageTypeMapping();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.rateUsageTypeMapping = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({
                        name: 'rateUsageTypeMappingListModification',
                        content: 'OK'
                    });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
