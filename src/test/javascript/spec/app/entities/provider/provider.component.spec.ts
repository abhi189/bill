/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { ProviderComponent } from '../../../../../../main/webapp/app/entities/provider/provider.component';
import { ProviderService } from '../../../../../../main/webapp/app/entities/provider/provider.service';
import { Provider } from '../../../../../../main/webapp/app/entities/provider/provider.model';

describe('Component Tests', () => {
    describe('Provider Management Component', () => {
        let comp: ProviderComponent;
        let fixture: ComponentFixture<ProviderComponent>;
        let service: ProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ProviderComponent],
                providers: [ProviderService]
            })
                .overrideTemplate(ProviderComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Provider(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.providers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
