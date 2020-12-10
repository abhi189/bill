/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { DataRetentionDetailComponent } from '../../../../../../main/webapp/app/entities/data-retention/data-retention-detail.component';
import { DataRetentionService } from '../../../../../../main/webapp/app/entities/data-retention/data-retention.service';
import { DataRetention } from '../../../../../../main/webapp/app/entities/data-retention/data-retention.model';

describe('Component Tests', () => {
    describe('DataRetention Management Detail Component', () => {
        let comp: DataRetentionDetailComponent;
        let fixture: ComponentFixture<DataRetentionDetailComponent>;
        let service: DataRetentionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [DataRetentionDetailComponent],
                providers: [DataRetentionService]
            })
                .overrideTemplate(DataRetentionDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataRetentionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataRetentionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new DataRetention(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataRetention).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
