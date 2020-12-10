/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityMappingRuleComponent } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.component';
import { UtilityMappingRuleService } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.service';
import { UtilityMappingRule } from '../../../../../../main/webapp/app/entities/utility-mapping-rule/utility-mapping-rule.model';

describe('Component Tests', () => {
    describe('UtilityMappingRule Management Component', () => {
        let comp: UtilityMappingRuleComponent;
        let fixture: ComponentFixture<UtilityMappingRuleComponent>;
        let service: UtilityMappingRuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityMappingRuleComponent],
                providers: [UtilityMappingRuleService]
            })
                .overrideTemplate(UtilityMappingRuleComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityMappingRuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityMappingRuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new UtilityMappingRule(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilityMappingRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
