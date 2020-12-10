/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AdjustmentComponent } from '../../../../../../main/webapp/app/entities/adjustment/adjustment.component';
import { AdjustmentService } from '../../../../../../main/webapp/app/entities/adjustment/adjustment.service';
import { Adjustment } from '../../../../../../main/webapp/app/entities/adjustment/adjustment.model';

describe('Component Tests', () => {
    describe('Adjustment Management Component', () => {
        let comp: AdjustmentComponent;
        let fixture: ComponentFixture<AdjustmentComponent>;
        let service: AdjustmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AdjustmentComponent],
                providers: [AdjustmentService]
            })
                .overrideTemplate(AdjustmentComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdjustmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdjustmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Adjustment(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.adjustments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
