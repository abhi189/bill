/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { TariffNameDetailComponent } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name-detail.component';
import { TariffNameService } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name.service';
import { TariffName } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name.model';

describe('Component Tests', () => {
    describe('TariffName Management Detail Component', () => {
        let comp: TariffNameDetailComponent;
        let fixture: ComponentFixture<TariffNameDetailComponent>;
        let service: TariffNameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffNameDetailComponent],
                providers: [TariffNameService]
            })
                .overrideTemplate(TariffNameDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffNameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffNameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new TariffName(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tariffName).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
