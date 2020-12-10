/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { ChargeComponent } from '../../../../../../main/webapp/app/entities/charge/charge.component';
import { ChargeService } from '../../../../../../main/webapp/app/entities/charge/charge.service';
import { Charge } from '../../../../../../main/webapp/app/entities/charge/charge.model';

describe('Component Tests', () => {
    describe('Charge Management Component', () => {
        let comp: ChargeComponent;
        let fixture: ComponentFixture<ChargeComponent>;
        let service: ChargeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ChargeComponent],
                providers: [ChargeService]
            })
                .overrideTemplate(ChargeComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChargeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Charge(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.charges[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
