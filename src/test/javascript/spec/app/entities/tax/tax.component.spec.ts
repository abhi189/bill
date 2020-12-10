/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TaxComponent } from '../../../../../../main/webapp/app/entities/tax/tax.component';
import { TaxService } from '../../../../../../main/webapp/app/entities/tax/tax.service';
import { Tax } from '../../../../../../main/webapp/app/entities/tax/tax.model';

describe('Component Tests', () => {
    describe('Tax Management Component', () => {
        let comp: TaxComponent;
        let fixture: ComponentFixture<TaxComponent>;
        let service: TaxService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TaxComponent],
                providers: [TaxService]
            })
                .overrideTemplate(TaxComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Tax(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.taxes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
