/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TariffMappingRuleComponent } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.component';
import { TariffMappingRuleService } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.service';
import { TariffMappingRule } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.model';

describe('Component Tests', () => {
    describe('TariffMappingRule Management Component', () => {
        let comp: TariffMappingRuleComponent;
        let fixture: ComponentFixture<TariffMappingRuleComponent>;
        let service: TariffMappingRuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffMappingRuleComponent],
                providers: [TariffMappingRuleService]
            })
                .overrideTemplate(TariffMappingRuleComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffMappingRuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffMappingRuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new TariffMappingRule(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tariffMappingRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
