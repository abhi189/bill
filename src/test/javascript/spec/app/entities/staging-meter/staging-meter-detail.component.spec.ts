/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { StagingMeterDetailComponent } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter-detail.component';
import { StagingMeterService } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter.service';
import { StagingMeter } from '../../../../../../main/webapp/app/entities/staging-meter/staging-meter.model';

describe('Component Tests', () => {
    describe('StagingMeter Management Detail Component', () => {
        let comp: StagingMeterDetailComponent;
        let fixture: ComponentFixture<StagingMeterDetailComponent>;
        let service: StagingMeterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingMeterDetailComponent],
                providers: [StagingMeterService]
            })
                .overrideTemplate(StagingMeterDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingMeterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingMeterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new StagingMeter(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stagingMeter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
