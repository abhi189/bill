/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { TariffMappingRuleDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule-delete-dialog.component';
import { TariffMappingRuleService } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.service';

describe('Component Tests', () => {
    describe('TariffMappingRule Management Delete Component', () => {
        let comp: TariffMappingRuleDeleteDialogComponent;
        let fixture: ComponentFixture<TariffMappingRuleDeleteDialogComponent>;
        let service: TariffMappingRuleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffMappingRuleDeleteDialogComponent],
                providers: [TariffMappingRuleService]
            })
                .overrideTemplate(TariffMappingRuleDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffMappingRuleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffMappingRuleService);
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
