/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { ProviderDetailComponent } from '../../../../../../main/webapp/app/entities/provider/provider-detail.component';
import { ProviderService } from '../../../../../../main/webapp/app/entities/provider/provider.service';
import { Provider } from '../../../../../../main/webapp/app/entities/provider/provider.model';

describe('Component Tests', () => {
    describe('Provider Management Detail Component', () => {
        let comp: ProviderDetailComponent;
        let fixture: ComponentFixture<ProviderDetailComponent>;
        let service: ProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ProviderDetailComponent],
                providers: [ProviderService]
            })
                .overrideTemplate(ProviderDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Provider(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.provider).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
