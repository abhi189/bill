/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { StagingMeterComponent } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter.component';
import { StagingMeterService } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter.service';
import { StagingMeter } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter.model';

describe('Component Tests', () => {
    describe('StagingMeter Management Component', () => {
        let comp: StagingMeterComponent;
        let fixture: ComponentFixture<StagingMeterComponent>;
        let service: StagingMeterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingMeterComponent],
                providers: [StagingMeterService]
            })
                .overrideTemplate(StagingMeterComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingMeterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingMeterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new StagingMeter(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stagingMeters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
