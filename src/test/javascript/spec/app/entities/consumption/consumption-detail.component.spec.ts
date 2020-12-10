/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { ConsumptionDetailComponent } from '../../../../../../main/webapp/app/entities/consumption/consumption-detail.component';
import { ConsumptionService } from '../../../../../../main/webapp/app/entities/consumption/consumption.service';
import { Consumption } from '../../../../../../main/webapp/app/entities/consumption/consumption.model';

describe('Component Tests', () => {
    describe('Consumption Management Detail Component', () => {
        let comp: ConsumptionDetailComponent;
        let fixture: ComponentFixture<ConsumptionDetailComponent>;
        let service: ConsumptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ConsumptionDetailComponent],
                providers: [ConsumptionService]
            })
                .overrideTemplate(ConsumptionDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsumptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Consumption(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.consumption).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
