/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { EquipmentComponent } from '../../../../../../main/webapp/app/entities/equipment/equipment.component';
import { EquipmentService } from '../../../../../../main/webapp/app/entities/equipment/equipment.service';
import { Equipment } from '../../../../../../main/webapp/app/entities/equipment/equipment.model';

describe('Component Tests', () => {
    describe('Equipment Management Component', () => {
        let comp: EquipmentComponent;
        let fixture: ComponentFixture<EquipmentComponent>;
        let service: EquipmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [EquipmentComponent],
                providers: [EquipmentService]
            })
                .overrideTemplate(EquipmentComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Equipment(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.equipment[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
