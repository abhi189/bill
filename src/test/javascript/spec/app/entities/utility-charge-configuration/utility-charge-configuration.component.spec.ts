/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityChargeConfigurationComponent } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.component';
import { UtilityChargeConfigurationService } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.service';
import { UtilityChargeConfiguration } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.model';

describe('Component Tests', () => {
    describe('UtilityChargeConfiguration Management Component', () => {
        let comp: UtilityChargeConfigurationComponent;
        let fixture: ComponentFixture<UtilityChargeConfigurationComponent>;
        let service: UtilityChargeConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityChargeConfigurationComponent],
                providers: [UtilityChargeConfigurationService]
            })
                .overrideTemplate(UtilityChargeConfigurationComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityChargeConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityChargeConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new UtilityChargeConfiguration(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilityChargeConfigurations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
