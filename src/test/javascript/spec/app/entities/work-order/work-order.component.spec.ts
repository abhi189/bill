/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { WorkOrderComponent } from '../../../../../../main/webapp/app/entities/work-order/work-order.component';
import { WorkOrderService } from '../../../../../../main/webapp/app/entities/work-order/work-order.service';
import { WorkOrder } from '../../../../../../main/webapp/app/entities/work-order/work-order.model';

describe('Component Tests', () => {
    describe('WorkOrder Management Component', () => {
        let comp: WorkOrderComponent;
        let fixture: ComponentFixture<WorkOrderComponent>;
        let service: WorkOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [WorkOrderComponent],
                providers: [WorkOrderService]
            })
                .overrideTemplate(WorkOrderComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkOrderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new WorkOrder(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
