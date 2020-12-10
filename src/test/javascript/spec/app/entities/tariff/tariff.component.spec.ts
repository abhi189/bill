/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TariffComponent } from '../../../../../../main/webapp/app/entities/tariff/tariff.component';
import { TariffService } from '../../../../../../main/webapp/app/entities/tariff/tariff.service';
import { Tariff } from '../../../../../../main/webapp/app/entities/tariff/tariff.model';

describe('Component Tests', () => {
    describe('Tariff Management Component', () => {
        let comp: TariffComponent;
        let fixture: ComponentFixture<TariffComponent>;
        let service: TariffService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffComponent],
                providers: [TariffService]
            })
                .overrideTemplate(TariffComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Tariff(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tariffs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
