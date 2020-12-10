import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Equipment e2e test', () => {
    let navBarPage: NavBarPage;
    let equipmentDialogPage: EquipmentDialogPage;
    let equipmentComponentsPage: EquipmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Equipment', () => {
        navBarPage.goToEntity('equipment');
        equipmentComponentsPage = new EquipmentComponentsPage();
        expect(equipmentComponentsPage.getTitle()).toMatch(/billingWebApp.equipment.home.title/);
    });

    it('should load create Equipment dialog', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentDialogPage = new EquipmentDialogPage();
        expect(equipmentDialogPage.getModalTitle()).toMatch(/billingWebApp.equipment.home.createOrEditLabel/);
        equipmentDialogPage.close();
    });

    it('should create and save Equipment', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentDialogPage.setNameInput('name');
        expect(equipmentDialogPage.getNameInput()).toMatch('name');
        equipmentDialogPage.setDescriptionInput('description');
        expect(equipmentDialogPage.getDescriptionInput()).toMatch('description');
        equipmentDialogPage.setBfSiteIdInput('bfSiteId');
        expect(equipmentDialogPage.getBfSiteIdInput()).toMatch('bfSiteId');
        equipmentDialogPage.setStateInput('state');
        expect(equipmentDialogPage.getStateInput()).toMatch('state');
        equipmentDialogPage.setMacAddressInput('macAddress');
        expect(equipmentDialogPage.getMacAddressInput()).toMatch('macAddress');
        equipmentDialogPage.setIpAddressInput('ipAddress');
        expect(equipmentDialogPage.getIpAddressInput()).toMatch('ipAddress');
        equipmentDialogPage.setLocationDetailsInput('locationDetails');
        expect(equipmentDialogPage.getLocationDetailsInput()).toMatch('locationDetails');
        equipmentDialogPage.setEquipmentNrInput('5');
        expect(equipmentDialogPage.getEquipmentNrInput()).toMatch('5');
        equipmentDialogPage.setEquipmentTypeInput('equipmentType');
        expect(equipmentDialogPage.getEquipmentTypeInput()).toMatch('equipmentType');
        equipmentDialogPage.save();
        expect(equipmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EquipmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-equipment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EquipmentDialogPage {
    modalTitle = element(by.css('h4#myEquipmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    bfSiteIdInput = element(by.css('input#field_bfSiteId'));
    stateInput = element(by.css('input#field_state'));
    macAddressInput = element(by.css('input#field_macAddress'));
    ipAddressInput = element(by.css('input#field_ipAddress'));
    locationDetailsInput = element(by.css('input#field_locationDetails'));
    equipmentNrInput = element(by.css('input#field_equipmentNr'));
    equipmentTypeInput = element(by.css('input#field_equipmentType'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setBfSiteIdInput = function(bfSiteId) {
        this.bfSiteIdInput.sendKeys(bfSiteId);
    };

    getBfSiteIdInput = function() {
        return this.bfSiteIdInput.getAttribute('value');
    };

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    };

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
    };

    setMacAddressInput = function(macAddress) {
        this.macAddressInput.sendKeys(macAddress);
    };

    getMacAddressInput = function() {
        return this.macAddressInput.getAttribute('value');
    };

    setIpAddressInput = function(ipAddress) {
        this.ipAddressInput.sendKeys(ipAddress);
    };

    getIpAddressInput = function() {
        return this.ipAddressInput.getAttribute('value');
    };

    setLocationDetailsInput = function(locationDetails) {
        this.locationDetailsInput.sendKeys(locationDetails);
    };

    getLocationDetailsInput = function() {
        return this.locationDetailsInput.getAttribute('value');
    };

    setEquipmentNrInput = function(equipmentNr) {
        this.equipmentNrInput.sendKeys(equipmentNr);
    };

    getEquipmentNrInput = function() {
        return this.equipmentNrInput.getAttribute('value');
    };

    setEquipmentTypeInput = function(equipmentType) {
        this.equipmentTypeInput.sendKeys(equipmentType);
    };

    getEquipmentTypeInput = function() {
        return this.equipmentTypeInput.getAttribute('value');
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
