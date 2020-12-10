/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { ChargeDetailComponent } from '../../../../../../main/webapp/app/entities/charge/charge-detail.component';
import { ChargeService } from '../../../../../../main/webapp/app/entities/charge/charge.service';
import { Charge } from '../../../../../../main/webapp/app/entities/charge/charge.model';

describe('Component Tests', () => {
    describe('Charge Management Detail Component', () => {
        let comp: ChargeDetailComponent;
        let fixture: ComponentFixture<ChargeDetailComponent>;
        let service: ChargeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ChargeDetailComponent],
                providers: [ChargeService]
            })
                .overrideTemplate(ChargeDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChargeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Charge(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.charge).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
