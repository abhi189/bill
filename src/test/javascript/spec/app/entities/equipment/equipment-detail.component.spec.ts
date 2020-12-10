/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { EquipmentDetailComponent } from '../../../../../../main/webapp/app/entities/equipment/equipment-detail.component';
import { EquipmentService } from '../../../../../../main/webapp/app/entities/equipment/equipment.service';
import { Equipment } from '../../../../../../main/webapp/app/entities/equipment/equipment.model';

describe('Component Tests', () => {
    describe('Equipment Management Detail Component', () => {
        let comp: EquipmentDetailComponent;
        let fixture: ComponentFixture<EquipmentDetailComponent>;
        let service: EquipmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [EquipmentDetailComponent],
                providers: [EquipmentService]
            })
                .overrideTemplate(EquipmentDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Equipment(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.equipment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
