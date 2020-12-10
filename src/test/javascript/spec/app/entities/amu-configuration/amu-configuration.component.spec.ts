/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AmuConfigurationComponent } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.component';
import { AmuConfigurationService } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.service';
import { AmuConfiguration } from '../../../../../../main/webapp/app/entities/amu-configuration/amu-configuration.model';

describe('Component Tests', () => {
    describe('AmuConfiguration Management Component', () => {
        let comp: AmuConfigurationComponent;
        let fixture: ComponentFixture<AmuConfigurationComponent>;
        let service: AmuConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AmuConfigurationComponent],
                providers: [AmuConfigurationService]
            })
                .overrideTemplate(AmuConfigurationComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AmuConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AmuConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new AmuConfiguration(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.amuConfigurations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
