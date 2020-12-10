import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contact e2e test', () => {
    let navBarPage: NavBarPage;
    let contactDialogPage: ContactDialogPage;
    let contactComponentsPage: ContactComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contacts', () => {
        navBarPage.goToEntity('contact');
        contactComponentsPage = new ContactComponentsPage();
        expect(contactComponentsPage.getTitle()).toMatch(/billingWebApp.contact.home.title/);
    });

    it('should load create Contact dialog', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage = new ContactDialogPage();
        expect(contactDialogPage.getModalTitle()).toMatch(/billingWebApp.contact.home.createOrEditLabel/);
        contactDialogPage.close();
    });

    it('should create and save Contacts', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage.setContactTypeInput('contactType');
        expect(contactDialogPage.getContactTypeInput()).toMatch('contactType');
        contactDialogPage.setNameInput('name');
        expect(contactDialogPage.getNameInput()).toMatch('name');
        contactDialogPage.setPhoneNumberInput('phoneNumber');
        expect(contactDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        contactDialogPage.setWebPageInput('webPage');
        expect(contactDialogPage.getWebPageInput()).toMatch('webPage');
        contactDialogPage.setNotesInput('notes');
        expect(contactDialogPage.getNotesInput()).toMatch('notes');
        contactDialogPage.setCityInput('city');
        expect(contactDialogPage.getCityInput()).toMatch('city');
        contactDialogPage.setStreetInput('street');
        expect(contactDialogPage.getStreetInput()).toMatch('street');
        contactDialogPage.setZipCodeInput('zipCode');
        expect(contactDialogPage.getZipCodeInput()).toMatch('zipCode');
        contactDialogPage.setCountryInput('country');
        expect(contactDialogPage.getCountryInput()).toMatch('country');
        contactDialogPage.setContactEmailInput('contactEmail');
        expect(contactDialogPage.getContactEmailInput()).toMatch('contactEmail');
        contactDialogPage.setCreatedDateInput(12310020012301);
        expect(contactDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        contactDialogPage.setLastModifyDateInput(12310020012301);
        expect(contactDialogPage.getLastModifyDateInput()).toMatch('2001-12-31T02:30');
        contactDialogPage.setModifiedByInput('modifiedBy');
        expect(contactDialogPage.getModifiedByInput()).toMatch('modifiedBy');
        contactDialogPage.setCreatedByInput('createdBy');
        expect(contactDialogPage.getCreatedByInput()).toMatch('createdBy');
        contactDialogPage.save();
        expect(contactDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContactComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contact div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContactDialogPage {
    modalTitle = element(by.css('h4#myContactLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    contactTypeInput = element(by.css('input#field_contactType'));
    nameInput = element(by.css('input#field_name'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    webPageInput = element(by.css('input#field_webPage'));
    notesInput = element(by.css('input#field_notes'));
    cityInput = element(by.css('input#field_city'));
    streetInput = element(by.css('input#field_street'));
    zipCodeInput = element(by.css('input#field_zipCode'));
    countryInput = element(by.css('input#field_country'));
    contactEmailInput = element(by.css('input#field_contactEmail'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifyDateInput = element(by.css('input#field_lastModifyDate'));
    modifiedByInput = element(by.css('input#field_modifiedBy'));
    createdByInput = element(by.css('input#field_createdBy'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setContactTypeInput = function(contactType) {
        this.contactTypeInput.sendKeys(contactType);
    };

    getContactTypeInput = function() {
        return this.contactTypeInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setWebPageInput = function(webPage) {
        this.webPageInput.sendKeys(webPage);
    };

    getWebPageInput = function() {
        return this.webPageInput.getAttribute('value');
    };

    setNotesInput = function(notes) {
        this.notesInput.sendKeys(notes);
    };

    getNotesInput = function() {
        return this.notesInput.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setStreetInput = function(street) {
        this.streetInput.sendKeys(street);
    };

    getStreetInput = function() {
        return this.streetInput.getAttribute('value');
    };

    setZipCodeInput = function(zipCode) {
        this.zipCodeInput.sendKeys(zipCode);
    };

    getZipCodeInput = function() {
        return this.zipCodeInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    setContactEmailInput = function(contactEmail) {
        this.contactEmailInput.sendKeys(contactEmail);
    };

    getContactEmailInput = function() {
        return this.contactEmailInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setLastModifyDateInput = function(lastModifyDate) {
        this.lastModifyDateInput.sendKeys(lastModifyDate);
    };

    getLastModifyDateInput = function() {
        return this.lastModifyDateInput.getAttribute('value');
    };

    setModifiedByInput = function(modifiedBy) {
        this.modifiedByInput.sendKeys(modifiedBy);
    };

    getModifiedByInput = function() {
        return this.modifiedByInput.getAttribute('value');
    };

    setCreatedByInput = function(createdBy) {
        this.createdByInput.sendKeys(createdBy);
    };

    getCreatedByInput = function() {
        return this.createdByInput.getAttribute('value');
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
