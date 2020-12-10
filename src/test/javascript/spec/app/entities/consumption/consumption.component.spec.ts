/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { ConsumptionComponent } from '../../../../../../main/webapp/app/entities/consumption/consumption.component';
import { ConsumptionService } from '../../../../../../main/webapp/app/entities/consumption/consumption.service';
import { Consumption } from '../../../../../../main/webapp/app/entities/consumption/consumption.model';

describe('Component Tests', () => {
    describe('Consumption Management Component', () => {
        let comp: ConsumptionComponent;
        let fixture: ComponentFixture<ConsumptionComponent>;
        let service: ConsumptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ConsumptionComponent],
                providers: [ConsumptionService]
            })
                .overrideTemplate(ConsumptionComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsumptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Consumption(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.consumptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
