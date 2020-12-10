import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Site e2e test', () => {
    let navBarPage: NavBarPage;
    let siteDialogPage: SiteDialogPage;
    let siteComponentsPage: SiteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sites', () => {
        navBarPage.goToEntity('site');
        siteComponentsPage = new SiteComponentsPage();
        expect(siteComponentsPage.getTitle()).toMatch(/billingWebApp.site.home.title/);
    });

    it('should load create Site dialog', () => {
        siteComponentsPage.clickOnCreateButton();
        siteDialogPage = new SiteDialogPage();
        expect(siteDialogPage.getModalTitle()).toMatch(/billingWebApp.site.home.createOrEditLabel/);
        siteDialogPage.close();
    });

    it('should create and save Sites', () => {
        siteComponentsPage.clickOnCreateButton();
        siteDialogPage.setBudderflyIdInput('budderflyId');
        expect(siteDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        siteDialogPage.setCustomerNameInput('customerName');
        expect(siteDialogPage.getCustomerNameInput()).toMatch('customerName');
        siteDialogPage.statusSelectLastOption();
        siteDialogPage.setCompanyTypeInput('companyType');
        expect(siteDialogPage.getCompanyTypeInput()).toMatch('companyType');
        siteDialogPage.setStoreNumberInput('5');
        expect(siteDialogPage.getStoreNumberInput()).toMatch('5');
        siteDialogPage.setAddressInput('address');
        expect(siteDialogPage.getAddressInput()).toMatch('address');
        siteDialogPage.setCityInput('city');
        expect(siteDialogPage.getCityInput()).toMatch('city');
        siteDialogPage.setStateInput('state');
        expect(siteDialogPage.getStateInput()).toMatch('state');
        siteDialogPage.setZipInput('zip');
        expect(siteDialogPage.getZipInput()).toMatch('zip');
        siteDialogPage.billingTypeSelectLastOption();
        siteDialogPage.paymentTypeSelectLastOption();
        siteDialogPage.siteTypeSelectLastOption();
        siteDialogPage.setOwnerNameInput('ownerName');
        expect(siteDialogPage.getOwnerNameInput()).toMatch('ownerName');
        siteDialogPage.setOwnerEmailInput('ownerEmail');
        expect(siteDialogPage.getOwnerEmailInput()).toMatch('ownerEmail');
        siteDialogPage.setOwnerPhoneInput('ownerPhone');
        expect(siteDialogPage.getOwnerPhoneInput()).toMatch('ownerPhone');
        siteDialogPage.setAddress1Input('address1');
        expect(siteDialogPage.getAddress1Input()).toMatch('address1');
        siteDialogPage.setAddress2Input('address2');
        expect(siteDialogPage.getAddress2Input()).toMatch('address2');
        siteDialogPage.setLatitudeInput('latitude');
        expect(siteDialogPage.getLatitudeInput()).toMatch('latitude');
        siteDialogPage.setLongitudeInput('longitude');
        expect(siteDialogPage.getLongitudeInput()).toMatch('longitude');
        siteDialogPage
            .getTaxExemptInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    siteDialogPage.getTaxExemptInput().click();
                    expect(siteDialogPage.getTaxExemptInput().isSelected()).toBeFalsy();
                } else {
                    siteDialogPage.getTaxExemptInput().click();
                    expect(siteDialogPage.getTaxExemptInput().isSelected()).toBeTruthy();
                }
            });
        siteDialogPage
            .getRollBillingInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    siteDialogPage.getRollBillingInput().click();
                    expect(siteDialogPage.getRollBillingInput().isSelected()).toBeFalsy();
                } else {
                    siteDialogPage.getRollBillingInput().click();
                    expect(siteDialogPage.getRollBillingInput().isSelected()).toBeTruthy();
                }
            });
        siteDialogPage
            .getEnableTicketDispatchInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    siteDialogPage.getEnableTicketDispatchInput().click();
                    expect(siteDialogPage.getEnableTicketDispatchInput().isSelected()).toBeFalsy();
                } else {
                    siteDialogPage.getEnableTicketDispatchInput().click();
                    expect(siteDialogPage.getEnableTicketDispatchInput().isSelected()).toBeTruthy();
                }
            });
        siteDialogPage.setContactDeskIdInput('contactDeskId');
        expect(siteDialogPage.getContactDeskIdInput()).toMatch('contactDeskId');
        siteDialogPage.parentSiteSelectLastOption();
        siteDialogPage.save();
        expect(siteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SiteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-site div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SiteDialogPage {
    modalTitle = element(by.css('h4#mySiteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    customerNameInput = element(by.css('input#field_customerName'));
    statusSelect = element(by.css('select#field_status'));
    companyTypeInput = element(by.css('input#field_companyType'));
    storeNumberInput = element(by.css('input#field_storeNumber'));
    addressInput = element(by.css('input#field_address'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    zipInput = element(by.css('input#field_zip'));
    billingTypeSelect = element(by.css('select#field_billingType'));
    paymentTypeSelect = element(by.css('select#field_paymentType'));
    siteTypeSelect = element(by.css('select#field_siteType'));
    ownerNameInput = element(by.css('input#field_ownerName'));
    ownerEmailInput = element(by.css('input#field_ownerEmail'));
    ownerPhoneInput = element(by.css('input#field_ownerPhone'));
    address1Input = element(by.css('input#field_address1'));
    address2Input = element(by.css('input#field_address2'));
    latitudeInput = element(by.css('input#field_latitude'));
    longitudeInput = element(by.css('input#field_longitude'));
    taxExemptInput = element(by.css('input#field_taxExempt'));
    rollBillingInput = element(by.css('input#field_rollBilling'));
    enableTicketDispatchInput = element(by.css('input#field_enableTicketDispatch'));
    contactDeskIdInput = element(by.css('input#field_contactDeskId'));
    parentSiteSelect = element(by.css('select#field_parentSite'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    setCustomerNameInput = function(customerName) {
        this.customerNameInput.sendKeys(customerName);
    };

    getCustomerNameInput = function() {
        return this.customerNameInput.getAttribute('value');
    };

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setCompanyTypeInput = function(companyType) {
        this.companyTypeInput.sendKeys(companyType);
    };

    getCompanyTypeInput = function() {
        return this.companyTypeInput.getAttribute('value');
    };

    setStoreNumberInput = function(storeNumber) {
        this.storeNumberInput.sendKeys(storeNumber);
    };

    getStoreNumberInput = function() {
        return this.storeNumberInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

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

    setZipInput = function(zip) {
        this.zipInput.sendKeys(zip);
    };

    getZipInput = function() {
        return this.zipInput.getAttribute('value');
    };

    setBillingTypeSelect = function(billingType) {
        this.billingTypeSelect.sendKeys(billingType);
    };

    getBillingTypeSelect = function() {
        return this.billingTypeSelect.element(by.css('option:checked')).getText();
    };

    billingTypeSelectLastOption = function() {
        this.billingTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setPaymentTypeSelect = function(paymentType) {
        this.paymentTypeSelect.sendKeys(paymentType);
    };

    getPaymentTypeSelect = function() {
        return this.paymentTypeSelect.element(by.css('option:checked')).getText();
    };

    paymentTypeSelectLastOption = function() {
        this.paymentTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setSiteTypeSelect = function(siteType) {
        this.siteTypeSelect.sendKeys(siteType);
    };

    getSiteTypeSelect = function() {
        return this.siteTypeSelect.element(by.css('option:checked')).getText();
    };

    siteTypeSelectLastOption = function() {
        this.siteTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setOwnerNameInput = function(ownerName) {
        this.ownerNameInput.sendKeys(ownerName);
    };

    getOwnerNameInput = function() {
        return this.ownerNameInput.getAttribute('value');
    };

    setOwnerEmailInput = function(ownerEmail) {
        this.ownerEmailInput.sendKeys(ownerEmail);
    };

    getOwnerEmailInput = function() {
        return this.ownerEmailInput.getAttribute('value');
    };

    setOwnerPhoneInput = function(ownerPhone) {
        this.ownerPhoneInput.sendKeys(ownerPhone);
    };

    getOwnerPhoneInput = function() {
        return this.ownerPhoneInput.getAttribute('value');
    };

    setAddress1Input = function(address1) {
        this.address1Input.sendKeys(address1);
    };

    getAddress1Input = function() {
        return this.address1Input.getAttribute('value');
    };

    setAddress2Input = function(address2) {
        this.address2Input.sendKeys(address2);
    };

    getAddress2Input = function() {
        return this.address2Input.getAttribute('value');
    };

    setLatitudeInput = function(latitude) {
        this.latitudeInput.sendKeys(latitude);
    };

    getLatitudeInput = function() {
        return this.latitudeInput.getAttribute('value');
    };

    setLongitudeInput = function(longitude) {
        this.longitudeInput.sendKeys(longitude);
    };

    getLongitudeInput = function() {
        return this.longitudeInput.getAttribute('value');
    };

    getTaxExemptInput = function() {
        return this.taxExemptInput;
    };
    getRollBillingInput = function() {
        return this.rollBillingInput;
    };
    getEnableTicketDispatchInput = function() {
        return this.enableTicketDispatchInput;
    };
    setContactDeskIdInput = function(contactDeskId) {
        this.contactDeskIdInput.sendKeys(contactDeskId);
    };

    getContactDeskIdInput = function() {
        return this.contactDeskIdInput.getAttribute('value');
    };

    parentSiteSelectLastOption = function() {
        this.parentSiteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    parentSiteSelectOption = function(option) {
        this.parentSiteSelect.sendKeys(option);
    };

    getParentSiteSelect = function() {
        return this.parentSiteSelect;
    };

    getParentSiteSelectedOption = function() {
        return this.parentSiteSelect.element(by.css('option:checked')).getText();
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
