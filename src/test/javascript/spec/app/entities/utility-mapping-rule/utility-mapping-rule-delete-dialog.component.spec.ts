/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityMappingRuleDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule-delete-dialog.component';
import { UtilityMappingRuleService } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.service';

describe('Component Tests', () => {
    describe('UtilityMappingRule Management Delete Component', () => {
        let comp: UtilityMappingRuleDeleteDialogComponent;
        let fixture: ComponentFixture<UtilityMappingRuleDeleteDialogComponent>;
        let service: UtilityMappingRuleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityMappingRuleDeleteDialogComponent],
                providers: [UtilityMappingRuleService]
            })
                .overrideTemplate(UtilityMappingRuleDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityMappingRuleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityMappingRuleService);
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
