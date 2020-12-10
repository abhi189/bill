import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tax e2e test', () => {
    let navBarPage: NavBarPage;
    let taxDialogPage: TaxDialogPage;
    let taxComponentsPage: TaxComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Taxes', () => {
        navBarPage.goToEntity('tax');
        taxComponentsPage = new TaxComponentsPage();
        expect(taxComponentsPage.getTitle()).toMatch(/billingWebApp.tax.home.title/);
    });

    it('should load create Tax dialog', () => {
        taxComponentsPage.clickOnCreateButton();
        taxDialogPage = new TaxDialogPage();
        expect(taxDialogPage.getModalTitle()).toMatch(/billingWebApp.tax.home.createOrEditLabel/);
        taxDialogPage.close();
    });

    it('should create and save Taxes', () => {
        taxComponentsPage.clickOnCreateButton();
        taxDialogPage.setCityInput('city');
        expect(taxDialogPage.getCityInput()).toMatch('city');
        taxDialogPage.setStateInput('state');
        expect(taxDialogPage.getStateInput()).toMatch('state');
        taxDialogPage.setCountryInput('country');
        expect(taxDialogPage.getCountryInput()).toMatch('country');
        taxDialogPage.setZipInput('zip');
        expect(taxDialogPage.getZipInput()).toMatch('zip');
        taxDialogPage.setCityTaxInput('5');
        expect(taxDialogPage.getCityTaxInput()).toMatch('5');
        taxDialogPage.setCityTaxNameInput('cityTaxName');
        expect(taxDialogPage.getCityTaxNameInput()).toMatch('cityTaxName');
        taxDialogPage.setCountyTaxInput('5');
        expect(taxDialogPage.getCountyTaxInput()).toMatch('5');
        taxDialogPage.setCountyTaxNameInput('countyTaxName');
        expect(taxDialogPage.getCountyTaxNameInput()).toMatch('countyTaxName');
        taxDialogPage.setOtherTaxInput('5');
        expect(taxDialogPage.getOtherTaxInput()).toMatch('5');
        taxDialogPage.setOtherTaxNameInput('otherTaxName');
        expect(taxDialogPage.getOtherTaxNameInput()).toMatch('otherTaxName');
        taxDialogPage.setVadidFromInput('2000-12-31');
        expect(taxDialogPage.getVadidFromInput()).toMatch('2000-12-31');
        taxDialogPage.setValidToInput('2000-12-31');
        expect(taxDialogPage.getValidToInput()).toMatch('2000-12-31');
        taxDialogPage.setCreatedByInput('createdBy');
        expect(taxDialogPage.getCreatedByInput()).toMatch('createdBy');
        taxDialogPage.setCreatedDateInput('2000-12-31');
        expect(taxDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        taxDialogPage.setEditedByInput('editedBy');
        expect(taxDialogPage.getEditedByInput()).toMatch('editedBy');
        taxDialogPage.setEditedDateInput('2000-12-31');
        expect(taxDialogPage.getEditedDateInput()).toMatch('2000-12-31');
        taxDialogPage.setStateTaxInput('5');
        expect(taxDialogPage.getStateTaxInput()).toMatch('5');
        taxDialogPage.setStateTaxNameInput('stateTaxName');
        expect(taxDialogPage.getStateTaxNameInput()).toMatch('stateTaxName');
        taxDialogPage.save();
        expect(taxDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TaxComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tax div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaxDialogPage {
    modalTitle = element(by.css('h4#myTaxLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    countryInput = element(by.css('input#field_country'));
    zipInput = element(by.css('input#field_zip'));
    cityTaxInput = element(by.css('input#field_cityTax'));
    cityTaxNameInput = element(by.css('input#field_cityTaxName'));
    countyTaxInput = element(by.css('input#field_countyTax'));
    countyTaxNameInput = element(by.css('input#field_countyTaxName'));
    otherTaxInput = element(by.css('input#field_otherTax'));
    otherTaxNameInput = element(by.css('input#field_otherTaxName'));
    vadidFromInput = element(by.css('input#field_vadidFrom'));
    validToInput = element(by.css('input#field_validTo'));
    createdByInput = element(by.css('input#field_createdBy'));
    createdDateInput = element(by.css('input#field_createdDate'));
    editedByInput = element(by.css('input#field_editedBy'));
    editedDateInput = element(by.css('input#field_editedDate'));
    stateTaxInput = element(by.css('input#field_stateTax'));
    stateTaxNameInput = element(by.css('input#field_stateTaxName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    };

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    setZipInput = function(zip) {
        this.zipInput.sendKeys(zip);
    };

    getZipInput = function() {
        return this.zipInput.getAttribute('value');
    };

    setCityTaxInput = function(cityTax) {
        this.cityTaxInput.sendKeys(cityTax);
    };

    getCityTaxInput = function() {
        return this.cityTaxInput.getAttribute('value');
    };

    setCityTaxNameInput = function(cityTaxName) {
        this.cityTaxNameInput.sendKeys(cityTaxName);
    };

    getCityTaxNameInput = function() {
        return this.cityTaxNameInput.getAttribute('value');
    };

    setCountyTaxInput = function(countyTax) {
        this.countyTaxInput.sendKeys(countyTax);
    };

    getCountyTaxInput = function() {
        return this.countyTaxInput.getAttribute('value');
    };

    setCountyTaxNameInput = function(countyTaxName) {
        this.countyTaxNameInput.sendKeys(countyTaxName);
    };

    getCountyTaxNameInput = function() {
        return this.countyTaxNameInput.getAttribute('value');
    };

    setOtherTaxInput = function(otherTax) {
        this.otherTaxInput.sendKeys(otherTax);
    };

    getOtherTaxInput = function() {
        return this.otherTaxInput.getAttribute('value');
    };

    setOtherTaxNameInput = function(otherTaxName) {
        this.otherTaxNameInput.sendKeys(otherTaxName);
    };

    getOtherTaxNameInput = function() {
        return this.otherTaxNameInput.getAttribute('value');
    };

    setVadidFromInput = function(vadidFrom) {
        this.vadidFromInput.sendKeys(vadidFrom);
    };

    getVadidFromInput = function() {
        return this.vadidFromInput.getAttribute('value');
    };

    setValidToInput = function(validTo) {
        this.validToInput.sendKeys(validTo);
    };

    getValidToInput = function() {
        return this.validToInput.getAttribute('value');
    };

    setCreatedByInput = function(createdBy) {
        this.createdByInput.sendKeys(createdBy);
    };

    getCreatedByInput = function() {
        return this.createdByInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setEditedByInput = function(editedBy) {
        this.editedByInput.sendKeys(editedBy);
    };

    getEditedByInput = function() {
        return this.editedByInput.getAttribute('value');
    };

    setEditedDateInput = function(editedDate) {
        this.editedDateInput.sendKeys(editedDate);
    };

    getEditedDateInput = function() {
        return this.editedDateInput.getAttribute('value');
    };

    setStateTaxInput = function(stateTax) {
        this.stateTaxInput.sendKeys(stateTax);
    };

    getStateTaxInput = function() {
        return this.stateTaxInput.getAttribute('value');
    };

    setStateTaxNameInput = function(stateTaxName) {
        this.stateTaxNameInput.sendKeys(stateTaxName);
    };

    getStateTaxNameInput = function() {
        return this.stateTaxNameInput.getAttribute('value');
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
