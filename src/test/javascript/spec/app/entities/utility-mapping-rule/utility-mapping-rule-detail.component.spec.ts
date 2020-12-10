/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityMappingRuleDetailComponent } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule-detail.component';
import { UtilityMappingRuleService } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.service';
import { UtilityMappingRule } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.model';

describe('Component Tests', () => {
    describe('UtilityMappingRule Management Detail Component', () => {
        let comp: UtilityMappingRuleDetailComponent;
        let fixture: ComponentFixture<UtilityMappingRuleDetailComponent>;
        let service: UtilityMappingRuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityMappingRuleDetailComponent],
                providers: [UtilityMappingRuleService]
            })
                .overrideTemplate(UtilityMappingRuleDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityMappingRuleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityMappingRuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new UtilityMappingRule(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.utilityMappingRule).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
