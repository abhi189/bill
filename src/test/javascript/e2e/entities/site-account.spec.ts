import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SiteAccount e2e test', () => {
    let navBarPage: NavBarPage;
    let siteAccountDialogPage: SiteAccountDialogPage;
    let siteAccountComponentsPage: SiteAccountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SiteAccounts', () => {
        navBarPage.goToEntity('site-account');
        siteAccountComponentsPage = new SiteAccountComponentsPage();
        expect(siteAccountComponentsPage.getTitle()).toMatch(/billingWebApp.siteAccount.home.title/);
    });

    it('should load create SiteAccount dialog', () => {
        siteAccountComponentsPage.clickOnCreateButton();
        siteAccountDialogPage = new SiteAccountDialogPage();
        expect(siteAccountDialogPage.getModalTitle()).toMatch(/billingWebApp.siteAccount.home.createOrEditLabel/);
        siteAccountDialogPage.close();
    });

    it('should create and save SiteAccounts', () => {
        siteAccountComponentsPage.clickOnCreateButton();
        siteAccountDialogPage.setUtilityProviderInput('utilityProvider');
        expect(siteAccountDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        siteAccountDialogPage.setAccountNumberInput('accountNumber');
        expect(siteAccountDialogPage.getAccountNumberInput()).toMatch('accountNumber');
        siteAccountDialogPage.setRawAccountNumberInput('rawAccountNumber');
        expect(siteAccountDialogPage.getRawAccountNumberInput()).toMatch('rawAccountNumber');
        siteAccountDialogPage.setMeterNumberInput('meterNumber');
        expect(siteAccountDialogPage.getMeterNumberInput()).toMatch('meterNumber');
        siteAccountDialogPage.setCustomerNameInput('customerName');
        expect(siteAccountDialogPage.getCustomerNameInput()).toMatch('customerName');
        siteAccountDialogPage.setCustomerCodeInput('customerCode');
        expect(siteAccountDialogPage.getCustomerCodeInput()).toMatch('customerCode');
        siteAccountDialogPage.setExpectedInvoicesInput('5');
        expect(siteAccountDialogPage.getExpectedInvoicesInput()).toMatch('5');
        siteAccountDialogPage.stateSelectLastOption();
        siteAccountDialogPage.setBillingStreetInput('billingStreet');
        expect(siteAccountDialogPage.getBillingStreetInput()).toMatch('billingStreet');
        siteAccountDialogPage.setBillingCityInput('billingCity');
        expect(siteAccountDialogPage.getBillingCityInput()).toMatch('billingCity');
        siteAccountDialogPage.setBillingStateInput('billingState');
        expect(siteAccountDialogPage.getBillingStateInput()).toMatch('billingState');
        siteAccountDialogPage.setBillingZipInput('billingZip');
        expect(siteAccountDialogPage.getBillingZipInput()).toMatch('billingZip');
        siteAccountDialogPage.setPaymentAddressFullInput('paymentAddressFull');
        expect(siteAccountDialogPage.getPaymentAddressFullInput()).toMatch('paymentAddressFull');
        siteAccountDialogPage.setPaymentAddressStreetInput('paymentAddressStreet');
        expect(siteAccountDialogPage.getPaymentAddressStreetInput()).toMatch('paymentAddressStreet');
        siteAccountDialogPage.setPaymentAddressCityInput('paymentAddressCity');
        expect(siteAccountDialogPage.getPaymentAddressCityInput()).toMatch('paymentAddressCity');
        siteAccountDialogPage.setPaymentAddressStateInput('paymentAddressState');
        expect(siteAccountDialogPage.getPaymentAddressStateInput()).toMatch('paymentAddressState');
        siteAccountDialogPage.setPaymentAddressZipInput('paymentAddressZip');
        expect(siteAccountDialogPage.getPaymentAddressZipInput()).toMatch('paymentAddressZip');
        siteAccountDialogPage.setSiteCodeInput('siteCode');
        expect(siteAccountDialogPage.getSiteCodeInput()).toMatch('siteCode');
        siteAccountDialogPage.setCustomerTypeInput('customerType');
        expect(siteAccountDialogPage.getCustomerTypeInput()).toMatch('customerType');
        siteAccountDialogPage.setSiteStreetInput('siteStreet');
        expect(siteAccountDialogPage.getSiteStreetInput()).toMatch('siteStreet');
        siteAccountDialogPage.setSiteCityInput('siteCity');
        expect(siteAccountDialogPage.getSiteCityInput()).toMatch('siteCity');
        siteAccountDialogPage.setSiteStateInput('siteState');
        expect(siteAccountDialogPage.getSiteStateInput()).toMatch('siteState');
        siteAccountDialogPage.setSiteZipInput('siteZip');
        expect(siteAccountDialogPage.getSiteZipInput()).toMatch('siteZip');
        siteAccountDialogPage.setSitePostalCodeInput('sitePostalCode');
        expect(siteAccountDialogPage.getSitePostalCodeInput()).toMatch('sitePostalCode');
        siteAccountDialogPage.setSiteAddress1Input('siteAddress1');
        expect(siteAccountDialogPage.getSiteAddress1Input()).toMatch('siteAddress1');
        siteAccountDialogPage.setSiteAddress2Input('siteAddress2');
        expect(siteAccountDialogPage.getSiteAddress2Input()).toMatch('siteAddress2');
        siteAccountDialogPage.setSiteLongitudeInput('5');
        expect(siteAccountDialogPage.getSiteLongitudeInput()).toMatch('5');
        siteAccountDialogPage.setSiteLatitudeInput('5');
        expect(siteAccountDialogPage.getSiteLatitudeInput()).toMatch('5');
        siteAccountDialogPage.setRequestedDateInput(12310020012301);
        expect(siteAccountDialogPage.getRequestedDateInput()).toMatch('2001-12-31T02:30');
        siteAccountDialogPage.setLiveDateInput(12310020012301);
        expect(siteAccountDialogPage.getLiveDateInput()).toMatch('2001-12-31T02:30');
        siteAccountDialogPage.setCreatedDateInput(12310020012301);
        expect(siteAccountDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        siteAccountDialogPage.setLastModifiedInput(12310020012301);
        expect(siteAccountDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        siteAccountDialogPage.setLastModifiedByInput('lastModifiedBy');
        expect(siteAccountDialogPage.getLastModifiedByInput()).toMatch('lastModifiedBy');
        siteAccountDialogPage.typeSelectLastOption();
        siteAccountDialogPage.setBudderflyIdInput('budderflyId');
        expect(siteAccountDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        siteAccountDialogPage.siteAccountSelectLastOption();
        siteAccountDialogPage.save();
        expect(siteAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SiteAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-site-account div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SiteAccountDialogPage {
    modalTitle = element(by.css('h4#mySiteAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    accountNumberInput = element(by.css('input#field_accountNumber'));
    rawAccountNumberInput = element(by.css('input#field_rawAccountNumber'));
    meterNumberInput = element(by.css('input#field_meterNumber'));
    customerNameInput = element(by.css('input#field_customerName'));
    customerCodeInput = element(by.css('input#field_customerCode'));
    expectedInvoicesInput = element(by.css('input#field_expectedInvoices'));
    stateSelect = element(by.css('select#field_state'));
    billingStreetInput = element(by.css('input#field_billingStreet'));
    billingCityInput = element(by.css('input#field_billingCity'));
    billingStateInput = element(by.css('input#field_billingState'));
    billingZipInput = element(by.css('input#field_billingZip'));
    paymentAddressFullInput = element(by.css('input#field_paymentAddressFull'));
    paymentAddressStreetInput = element(by.css('input#field_paymentAddressStreet'));
    paymentAddressCityInput = element(by.css('input#field_paymentAddressCity'));
    paymentAddressStateInput = element(by.css('input#field_paymentAddressState'));
    paymentAddressZipInput = element(by.css('input#field_paymentAddressZip'));
    siteCodeInput = element(by.css('input#field_siteCode'));
    customerTypeInput = element(by.css('input#field_customerType'));
    siteStreetInput = element(by.css('input#field_siteStreet'));
    siteCityInput = element(by.css('input#field_siteCity'));
    siteStateInput = element(by.css('input#field_siteState'));
    siteZipInput = element(by.css('input#field_siteZip'));
    sitePostalCodeInput = element(by.css('input#field_sitePostalCode'));
    siteAddress1Input = element(by.css('input#field_siteAddress1'));
    siteAddress2Input = element(by.css('input#field_siteAddress2'));
    siteLongitudeInput = element(by.css('input#field_siteLongitude'));
    siteLatitudeInput = element(by.css('input#field_siteLatitude'));
    requestedDateInput = element(by.css('input#field_requestedDate'));
    liveDateInput = element(by.css('input#field_liveDate'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    lastModifiedByInput = element(by.css('input#field_lastModifiedBy'));
    typeSelect = element(by.css('select#field_type'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUtilityProviderInput = function(utilityProvider) {
        this.utilityProviderInput.sendKeys(utilityProvider);
    };

    getUtilityProviderInput = function() {
        return this.utilityProviderInput.getAttribute('value');
    };

    setAccountNumberInput = function(accountNumber) {
        this.accountNumberInput.sendKeys(accountNumber);
    };

    getAccountNumberInput = function() {
        return this.accountNumberInput.getAttribute('value');
    };

    setRawAccountNumberInput = function(rawAccountNumber) {
        this.rawAccountNumberInput.sendKeys(rawAccountNumber);
    };

    getRawAccountNumberInput = function() {
        return this.rawAccountNumberInput.getAttribute('value');
    };

    setMeterNumberInput = function(meterNumber) {
        this.meterNumberInput.sendKeys(meterNumber);
    };

    getMeterNumberInput = function() {
        return this.meterNumberInput.getAttribute('value');
    };

    setCustomerNameInput = function(customerName) {
        this.customerNameInput.sendKeys(customerName);
    };

    getCustomerNameInput = function() {
        return this.customerNameInput.getAttribute('value');
    };

    setCustomerCodeInput = function(customerCode) {
        this.customerCodeInput.sendKeys(customerCode);
    };

    getCustomerCodeInput = function() {
        return this.customerCodeInput.getAttribute('value');
    };

    setExpectedInvoicesInput = function(expectedInvoices) {
        this.expectedInvoicesInput.sendKeys(expectedInvoices);
    };

    getExpectedInvoicesInput = function() {
        return this.expectedInvoicesInput.getAttribute('value');
    };

    setStateSelect = function(state) {
        this.stateSelect.sendKeys(state);
    };

    getStateSelect = function() {
        return this.stateSelect.element(by.css('option:checked')).getText();
    };

    stateSelectLastOption = function() {
        this.stateSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setBillingStreetInput = function(billingStreet) {
        this.billingStreetInput.sendKeys(billingStreet);
    };

    getBillingStreetInput = function() {
        return this.billingStreetInput.getAttribute('value');
    };

    setBillingCityInput = function(billingCity) {
        this.billingCityInput.sendKeys(billingCity);
    };

    getBillingCityInput = function() {
        return this.billingCityInput.getAttribute('value');
    };

    setBillingStateInput = function(billingState) {
        this.billingStateInput.sendKeys(billingState);
    };

    getBillingStateInput = function() {
        return this.billingStateInput.getAttribute('value');
    };

    setBillingZipInput = function(billingZip) {
        this.billingZipInput.sendKeys(billingZip);
    };

    getBillingZipInput = function() {
        return this.billingZipInput.getAttribute('value');
    };

    setPaymentAddressFullInput = function(paymentAddressFull) {
        this.paymentAddressFullInput.sendKeys(paymentAddressFull);
    };

    getPaymentAddressFullInput = function() {
        return this.paymentAddressFullInput.getAttribute('value');
    };

    setPaymentAddressStreetInput = function(paymentAddressStreet) {
        this.paymentAddressStreetInput.sendKeys(paymentAddressStreet);
    };

    getPaymentAddressStreetInput = function() {
        return this.paymentAddressStreetInput.getAttribute('value');
    };

    setPaymentAddressCityInput = function(paymentAddressCity) {
        this.paymentAddressCityInput.sendKeys(paymentAddressCity);
    };

    getPaymentAddressCityInput = function() {
        return this.paymentAddressCityInput.getAttribute('value');
    };

    setPaymentAddressStateInput = function(paymentAddressState) {
        this.paymentAddressStateInput.sendKeys(paymentAddressState);
    };

    getPaymentAddressStateInput = function() {
        return this.paymentAddressStateInput.getAttribute('value');
    };

    setPaymentAddressZipInput = function(paymentAddressZip) {
        this.paymentAddressZipInput.sendKeys(paymentAddressZip);
    };

    getPaymentAddressZipInput = function() {
        return this.paymentAddressZipInput.getAttribute('value');
    };

    setSiteCodeInput = function(siteCode) {
        this.siteCodeInput.sendKeys(siteCode);
    };

    getSiteCodeInput = function() {
        return this.siteCodeInput.getAttribute('value');
    };

    setCustomerTypeInput = function(customerType) {
        this.customerTypeInput.sendKeys(customerType);
    };

    getCustomerTypeInput = function() {
        return this.customerTypeInput.getAttribute('value');
    };

    setSiteStreetInput = function(siteStreet) {
        this.siteStreetInput.sendKeys(siteStreet);
    };

    getSiteStreetInput = function() {
        return this.siteStreetInput.getAttribute('value');
    };

    setSiteCityInput = function(siteCity) {
        this.siteCityInput.sendKeys(siteCity);
    };

    getSiteCityInput = function() {
        return this.siteCityInput.getAttribute('value');
    };

    setSiteStateInput = function(siteState) {
        this.siteStateInput.sendKeys(siteState);
    };

    getSiteStateInput = function() {
        return this.siteStateInput.getAttribute('value');
    };

    setSiteZipInput = function(siteZip) {
        this.siteZipInput.sendKeys(siteZip);
    };

    getSiteZipInput = function() {
        return this.siteZipInput.getAttribute('value');
    };

    setSitePostalCodeInput = function(sitePostalCode) {
        this.sitePostalCodeInput.sendKeys(sitePostalCode);
    };

    getSitePostalCodeInput = function() {
        return this.sitePostalCodeInput.getAttribute('value');
    };

    setSiteAddress1Input = function(siteAddress1) {
        this.siteAddress1Input.sendKeys(siteAddress1);
    };

    getSiteAddress1Input = function() {
        return this.siteAddress1Input.getAttribute('value');
    };

    setSiteAddress2Input = function(siteAddress2) {
        this.siteAddress2Input.sendKeys(siteAddress2);
    };

    getSiteAddress2Input = function() {
        return this.siteAddress2Input.getAttribute('value');
    };

    setSiteLongitudeInput = function(siteLongitude) {
        this.siteLongitudeInput.sendKeys(siteLongitude);
    };

    getSiteLongitudeInput = function() {
        return this.siteLongitudeInput.getAttribute('value');
    };

    setSiteLatitudeInput = function(siteLatitude) {
        this.siteLatitudeInput.sendKeys(siteLatitude);
    };

    getSiteLatitudeInput = function() {
        return this.siteLatitudeInput.getAttribute('value');
    };

    setRequestedDateInput = function(requestedDate) {
        this.requestedDateInput.sendKeys(requestedDate);
    };

    getRequestedDateInput = function() {
        return this.requestedDateInput.getAttribute('value');
    };

    setLiveDateInput = function(liveDate) {
        this.liveDateInput.sendKeys(liveDate);
    };

    getLiveDateInput = function() {
        return this.liveDateInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setLastModifiedInput = function(lastModified) {
        this.lastModifiedInput.sendKeys(lastModified);
    };

    getLastModifiedInput = function() {
        return this.lastModifiedInput.getAttribute('value');
    };

    setLastModifiedByInput = function(lastModifiedBy) {
        this.lastModifiedByInput.sendKeys(lastModifiedBy);
    };

    getLastModifiedByInput = function() {
        return this.lastModifiedByInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    siteAccountSelectLastOption = function() {
        this.siteAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    siteAccountSelectOption = function(option) {
        this.siteAccountSelect.sendKeys(option);
    };

    getSiteAccountSelect = function() {
        return this.siteAccountSelect;
    };

    getSiteAccountSelectedOption = function() {
        return this.siteAccountSelect.element(by.css('option:checked')).getText();
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
