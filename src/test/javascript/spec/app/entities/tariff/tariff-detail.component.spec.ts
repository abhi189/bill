/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { TariffDetailComponent } from '../../../../../../main/webapp/app/entities/tariff/tariff-detail.component';
import { TariffService } from '../../../../../../main/webapp/app/entities/tariff/tariff.service';
import { Tariff } from '../../../../../../main/webapp/app/entities/tariff/tariff.model';

describe('Component Tests', () => {
    describe('Tariff Management Detail Component', () => {
        let comp: TariffDetailComponent;
        let fixture: ComponentFixture<TariffDetailComponent>;
        let service: TariffService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffDetailComponent],
                providers: [TariffService]
            })
                .overrideTemplate(TariffDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Tariff(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tariff).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
