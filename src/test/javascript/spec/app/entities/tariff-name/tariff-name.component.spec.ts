/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TariffNameComponent } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name.component';
import { TariffNameService } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name.service';
import { TariffName } from '../../../../../../main/webapp/app/entities/tariff-name/tariff-name.model';

describe('Component Tests', () => {
    describe('TariffName Management Component', () => {
        let comp: TariffNameComponent;
        let fixture: ComponentFixture<TariffNameComponent>;
        let service: TariffNameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffNameComponent],
                providers: [TariffNameService]
            })
                .overrideTemplate(TariffNameComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffNameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffNameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new TariffName(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tariffNames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
