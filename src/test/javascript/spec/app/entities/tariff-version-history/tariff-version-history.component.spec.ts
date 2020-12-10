/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TariffVersionHistoryComponent } from '../../../../../../main/webapp/app/entities/tariff/tariff-version-history/tariff-version-history.component';
import { TariffVersionHistoryService } from '../../../../../../main/webapp/app/entities/tariff/tariff-version-history/tariff-version-history.service';
import { TariffVersionHistory } from '../../../../../../main/webapp/app/entities/tariff/tariff-version-history/tariff-version-history.model';

describe('Component Tests', () => {
    describe('TariffVersionHistory Management Component', () => {
        let comp: TariffVersionHistoryComponent;
        let fixture: ComponentFixture<TariffVersionHistoryComponent>;
        let service: TariffVersionHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TariffVersionHistoryComponent],
                providers: [TariffVersionHistoryService]
            })
                .overrideTemplate(TariffVersionHistoryComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TariffVersionHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TariffVersionHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new TariffVersionHistory(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tariffVersionHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
