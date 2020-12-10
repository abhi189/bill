/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AmuConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration-detail.component';
import { AmuConfigurationService } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.service';
import { AmuConfiguration } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.model';

describe('Component Tests', () => {
    describe('AmuConfiguration Management Detail Component', () => {
        let comp: AmuConfigurationDetailComponent;
        let fixture: ComponentFixture<AmuConfigurationDetailComponent>;
        let service: AmuConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AmuConfigurationDetailComponent],
                providers: [AmuConfigurationService]
            })
                .overrideTemplate(AmuConfigurationDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmuConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmuConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new AmuConfiguration(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.amuConfiguration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
