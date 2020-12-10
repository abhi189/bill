/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { TariffMappingRuleDetailComponent } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule-detail.component';
import { TariffMappingRuleService } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.service';
import { TariffMappingRule } from '../../../../../../main/webapp/app/entities/tariff-mapping-rule/tariff-mapping-rule.model';

describe('Component Tests', () => {
    describe('TariffMappingRule Management Detail Component', () => {
        let comp: TariffMappingRuleDetailComponent;
        let fixture: ComponentFixture<TariffMappingRuleDetailComponent>;
        let service: TariffMappingRuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffMappingRuleDetailComponent],
                providers: [TariffMappingRuleService]
            })
                .overrideTemplate(TariffMappingRuleDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffMappingRuleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffMappingRuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new TariffMappingRule(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tariffMappingRule).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
