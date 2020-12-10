/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { SiteComponent } from '../../../../../../main/webapp/app/entities/site/site.component';
import { SiteService } from '../../../../../../main/webapp/app/entities/site/site.service';
import { Site } from '../../../../../../main/webapp/app/entities/site/site.model';

describe('Component Tests', () => {
    describe('Site Management Component', () => {
        let comp: SiteComponent;
        let fixture: ComponentFixture<SiteComponent>;
        let service: SiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SiteComponent],
                providers: [SiteService]
            })
                .overrideTemplate(SiteComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Site(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
