/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { EquipmentTypeDetailComponent } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type-detail.component';
import { EquipmentTypeService } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type.service';
import { EquipmentType } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type.model';

describe('Component Tests', () => {
    describe('EquipmentType Management Detail Component', () => {
        let comp: EquipmentTypeDetailComponent;
        let fixture: ComponentFixture<EquipmentTypeDetailComponent>;
        let service: EquipmentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [EquipmentTypeDetailComponent],
                providers: [EquipmentTypeService]
            })
                .overrideTemplate(EquipmentTypeDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new EquipmentType(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.equipmentType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
