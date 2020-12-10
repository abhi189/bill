import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('EquipmentType e2e test', () => {
    let navBarPage: NavBarPage;
    let equipmentTypeDialogPage: EquipmentTypeDialogPage;
    let equipmentTypeComponentsPage: EquipmentTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EquipmentTypes', () => {
        navBarPage.goToEntity('equipment-type');
        equipmentTypeComponentsPage = new EquipmentTypeComponentsPage();
        expect(equipmentTypeComponentsPage.getTitle()).toMatch(/billingWebApp.inventoryEquipmentType.home.title/);
    });

    it('should load create EquipmentType dialog', () => {
        equipmentTypeComponentsPage.clickOnCreateButton();
        equipmentTypeDialogPage = new EquipmentTypeDialogPage();
        expect(equipmentTypeDialogPage.getModalTitle()).toMatch(/billingWebApp.inventoryEquipmentType.home.createOrEditLabel/);
        equipmentTypeDialogPage.close();
    });

    it('should create and save EquipmentTypes', () => {
        equipmentTypeComponentsPage.clickOnCreateButton();
        equipmentTypeDialogPage.setCodeInput('code');
        expect(equipmentTypeDialogPage.getCodeInput()).toMatch('code');
        equipmentTypeDialogPage.setNameInput('name');
        expect(equipmentTypeDialogPage.getNameInput()).toMatch('name');
        equipmentTypeDialogPage.setEquipmentCountInput('5');
        expect(equipmentTypeDialogPage.getEquipmentCountInput()).toMatch('5');
        equipmentTypeDialogPage.save();
        expect(equipmentTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EquipmentTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-equipment-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EquipmentTypeDialogPage {
    modalTitle = element(by.css('h4#myEquipmentTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    nameInput = element(by.css('input#field_name'));
    equipmentCountInput = element(by.css('input#field_equipmentCount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setEquipmentCountInput = function(equipmentCount) {
        this.equipmentCountInput.sendKeys(equipmentCount);
    };

    getEquipmentCountInput = function() {
        return this.equipmentCountInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
