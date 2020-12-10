/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { StagingConsumptionComponent } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.component';
import { StagingConsumptionService } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.service';
import { StagingConsumption } from '../../../../../../main/webapp/app/entities/staging-consumption/staging-consumption.model';

describe('Component Tests', () => {
    describe('StagingConsumption Management Component', () => {
        let comp: StagingConsumptionComponent;
        let fixture: ComponentFixture<StagingConsumptionComponent>;
        let service: StagingConsumptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingConsumptionComponent],
                providers: [StagingConsumptionService]
            })
                .overrideTemplate(StagingConsumptionComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingConsumptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingConsumptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new StagingConsumption(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stagingConsumptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
