/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityChargeConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration-detail.component';
import { UtilityChargeConfigurationService } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.service';
import { UtilityChargeConfiguration } from '../../../../../../main/webapp/app/entities/utility-charge-configuration/utility-charge-configuration.model';

describe('Component Tests', () => {
    describe('UtilityChargeConfiguration Management Detail Component', () => {
        let comp: UtilityChargeConfigurationDetailComponent;
        let fixture: ComponentFixture<UtilityChargeConfigurationDetailComponent>;
        let service: UtilityChargeConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityChargeConfigurationDetailComponent],
                providers: [UtilityChargeConfigurationService]
            })
                .overrideTemplate(UtilityChargeConfigurationDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityChargeConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityChargeConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new UtilityChargeConfiguration(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.utilityChargeConfiguration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
