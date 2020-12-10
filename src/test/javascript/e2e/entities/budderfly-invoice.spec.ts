import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BudderflyInvoice e2e test', () => {
    let navBarPage: NavBarPage;
    let budderflyInvoiceDialogPage: BudderflyInvoiceDialogPage;
    let budderflyInvoiceComponentsPage: BudderflyInvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BudderflyInvoices', () => {
        navBarPage.goToEntity('budderfly-invoice');
        budderflyInvoiceComponentsPage = new BudderflyInvoiceComponentsPage();
        expect(budderflyInvoiceComponentsPage.getTitle()).toMatch(/billingWebApp.budderflyInvoice.home.title/);
    });

    it('should load create BudderflyInvoice dialog', () => {
        budderflyInvoiceComponentsPage.clickOnCreateButton();
        budderflyInvoiceDialogPage = new BudderflyInvoiceDialogPage();
        expect(budderflyInvoiceDialogPage.getModalTitle()).toMatch(/billingWebApp.budderflyInvoice.home.createOrEditLabel/);
        budderflyInvoiceDialogPage.close();
    });

    it('should create and save BudderflyInvoices', () => {
        budderflyInvoiceComponentsPage.clickOnCreateButton();
        budderflyInvoiceDialogPage.setBudderflyIdInput('budderflyId');
        expect(budderflyInvoiceDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        budderflyInvoiceDialogPage.setInvoiceNumberInput('invoiceNumber');
        expect(budderflyInvoiceDialogPage.getInvoiceNumberInput()).toMatch('invoiceNumber');
        budderflyInvoiceDialogPage.setLastInvoiceInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getLastInvoiceInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setContactNameInput('contactName');
        expect(budderflyInvoiceDialogPage.getContactNameInput()).toMatch('contactName');
        budderflyInvoiceDialogPage.setContactEmailInput('contactEmail');
        expect(budderflyInvoiceDialogPage.getContactEmailInput()).toMatch('contactEmail');
        budderflyInvoiceDialogPage.setLEDInstallDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getLEDInstallDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setAccountTakeOverDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getAccountTakeOverDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setUtilityProviderInput('utilityProvider');
        expect(budderflyInvoiceDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        budderflyInvoiceDialogPage.setTariffInput('tariff');
        expect(budderflyInvoiceDialogPage.getTariffInput()).toMatch('tariff');
        budderflyInvoiceDialogPage.setAddressInput('address');
        expect(budderflyInvoiceDialogPage.getAddressInput()).toMatch('address');
        budderflyInvoiceDialogPage.setCityInput('city');
        expect(budderflyInvoiceDialogPage.getCityInput()).toMatch('city');
        budderflyInvoiceDialogPage.setStateInput('state');
        expect(budderflyInvoiceDialogPage.getStateInput()).toMatch('state');
        budderflyInvoiceDialogPage.setZipCodeInput('zipCode');
        expect(budderflyInvoiceDialogPage.getZipCodeInput()).toMatch('zipCode');
        budderflyInvoiceDialogPage.setMessageInput('message');
        expect(budderflyInvoiceDialogPage.getMessageInput()).toMatch('message');
        budderflyInvoiceDialogPage.setCountryInput('country');
        expect(budderflyInvoiceDialogPage.getCountryInput()).toMatch('country');
        budderflyInvoiceDialogPage
            .getArrearsInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    budderflyInvoiceDialogPage.getArrearsInput().click();
                    expect(budderflyInvoiceDialogPage.getArrearsInput().isSelected()).toBeFalsy();
                } else {
                    budderflyInvoiceDialogPage.getArrearsInput().click();
                    expect(budderflyInvoiceDialogPage.getArrearsInput().isSelected()).toBeTruthy();
                }
            });
        budderflyInvoiceDialogPage.setDiscountInput('5');
        expect(budderflyInvoiceDialogPage.getDiscountInput()).toMatch('5');
        budderflyInvoiceDialogPage.setPriorBalanceInput('5');
        expect(budderflyInvoiceDialogPage.getPriorBalanceInput()).toMatch('5');
        budderflyInvoiceDialogPage.setPaymentsCreditsInput('5');
        expect(budderflyInvoiceDialogPage.getPaymentsCreditsInput()).toMatch('5');
        budderflyInvoiceDialogPage.setTotalNewElectricChargesInput('5');
        expect(budderflyInvoiceDialogPage.getTotalNewElectricChargesInput()).toMatch('5');
        budderflyInvoiceDialogPage.setTotalOtherChargesInput('5');
        expect(budderflyInvoiceDialogPage.getTotalOtherChargesInput()).toMatch('5');
        budderflyInvoiceDialogPage.setTaxesInput('5');
        expect(budderflyInvoiceDialogPage.getTaxesInput()).toMatch('5');
        budderflyInvoiceDialogPage.setTotalNewChargesInput('5');
        expect(budderflyInvoiceDialogPage.getTotalNewChargesInput()).toMatch('5');
        budderflyInvoiceDialogPage.setAmountDueInput('5');
        expect(budderflyInvoiceDialogPage.getAmountDueInput()).toMatch('5');
        budderflyInvoiceDialogPage.setPdfUrlInput('pdfUrl');
        expect(budderflyInvoiceDialogPage.getPdfUrlInput()).toMatch('pdfUrl');
        budderflyInvoiceDialogPage.setApprovedByInput('approvedBy');
        expect(budderflyInvoiceDialogPage.getApprovedByInput()).toMatch('approvedBy');
        budderflyInvoiceDialogPage.setApprovedDateInput(12310020012301);
        expect(budderflyInvoiceDialogPage.getApprovedDateInput()).toMatch('2001-12-31T02:30');
        budderflyInvoiceDialogPage.setRejectedByInput('rejectedBy');
        expect(budderflyInvoiceDialogPage.getRejectedByInput()).toMatch('rejectedBy');
        budderflyInvoiceDialogPage.setRejectedDateInput(12310020012301);
        expect(budderflyInvoiceDialogPage.getRejectedDateInput()).toMatch('2001-12-31T02:30');
        budderflyInvoiceDialogPage.setRejectionNotesInput('rejectionNotes');
        expect(budderflyInvoiceDialogPage.getRejectionNotesInput()).toMatch('rejectionNotes');
        budderflyInvoiceDialogPage.budderflyInvoiceStatusSelectLastOption();
        budderflyInvoiceDialogPage.setDiscountAmountInput('5');
        expect(budderflyInvoiceDialogPage.getDiscountAmountInput()).toMatch('5');
        budderflyInvoiceDialogPage.setStartDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getStartDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setEndDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getEndDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setStatementDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getStatementDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setDueDateInput('2000-12-31');
        expect(budderflyInvoiceDialogPage.getDueDateInput()).toMatch('2000-12-31');
        budderflyInvoiceDialogPage.setBillingDaysInput('5');
        expect(budderflyInvoiceDialogPage.getBillingDaysInput()).toMatch('5');
        budderflyInvoiceDialogPage.billingCycleSelectLastOption();
        budderflyInvoiceDialogPage.save();
        expect(budderflyInvoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BudderflyInvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-budderfly-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BudderflyInvoiceDialogPage {
    modalTitle = element(by.css('h4#myBudderflyInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    invoiceNumberInput = element(by.css('input#field_invoiceNumber'));
    lastInvoiceInput = element(by.css('input#field_lastInvoice'));
    contactNameInput = element(by.css('input#field_contactName'));
    contactEmailInput = element(by.css('input#field_contactEmail'));
    LEDInstallDateInput = element(by.css('input#field_LEDInstallDate'));
    accountTakeOverDateInput = element(by.css('input#field_accountTakeOverDate'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    tariffInput = element(by.css('input#field_tariff'));
    addressInput = element(by.css('input#field_address'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    zipCodeInput = element(by.css('input#field_zipCode'));
    messageInput = element(by.css('input#field_message'));
    countryInput = element(by.css('input#field_country'));
    arrearsInput = element(by.css('input#field_arrears'));
    discountInput = element(by.css('input#field_discount'));
    priorBalanceInput = element(by.css('input#field_priorBalance'));
    paymentsCreditsInput = element(by.css('input#field_paymentsCredits'));
    totalNewElectricChargesInput = element(by.css('input#field_totalNewElectricCharges'));
    totalOtherChargesInput = element(by.css('input#field_totalOtherCharges'));
    taxesInput = element(by.css('input#field_taxes'));
    totalNewChargesInput = element(by.css('input#field_totalNewCharges'));
    amountDueInput = element(by.css('input#field_amountDue'));
    pdfUrlInput = element(by.css('input#field_pdfUrl'));
    approvedByInput = element(by.css('input#field_approvedBy'));
    approvedDateInput = element(by.css('input#field_approvedDate'));
    rejectedByInput = element(by.css('input#field_rejectedBy'));
    rejectedDateInput = element(by.css('input#field_rejectedDate'));
    rejectionNotesInput = element(by.css('input#field_rejectionNotes'));
    budderflyInvoiceStatusSelect = element(by.css('select#field_budderflyInvoiceStatus'));
    discountAmountInput = element(by.css('input#field_discountAmount'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    statementDateInput = element(by.css('input#field_statementDate'));
    dueDateInput = element(by.css('input#field_dueDate'));
    billingDaysInput = element(by.css('input#field_billingDays'));
    billingCycleSelect = element(by.css('select#field_billingCycle'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    setInvoiceNumberInput = function(invoiceNumber) {
        this.invoiceNumberInput.sendKeys(invoiceNumber);
    };

    getInvoiceNumberInput = function() {
        return this.invoiceNumberInput.getAttribute('value');
    };

    setLastInvoiceInput = function(lastInvoice) {
        this.lastInvoiceInput.sendKeys(lastInvoice);
    };

    getLastInvoiceInput = function() {
        return this.lastInvoiceInput.getAttribute('value');
    };

    setContactNameInput = function(contactName) {
        this.contactNameInput.sendKeys(contactName);
    };

    getContactNameInput = function() {
        return this.contactNameInput.getAttribute('value');
    };

    setContactEmailInput = function(contactEmail) {
        this.contactEmailInput.sendKeys(contactEmail);
    };

    getContactEmailInput = function() {
        return this.contactEmailInput.getAttribute('value');
    };

    setLEDInstallDateInput = function(LEDInstallDate) {
        this.LEDInstallDateInput.sendKeys(LEDInstallDate);
    };

    getLEDInstallDateInput = function() {
        return this.LEDInstallDateInput.getAttribute('value');
    };

    setAccountTakeOverDateInput = function(accountTakeOverDate) {
        this.accountTakeOverDateInput.sendKeys(accountTakeOverDate);
    };

    getAccountTakeOverDateInput = function() {
        return this.accountTakeOverDateInput.getAttribute('value');
    };

    setUtilityProviderInput = function(utilityProvider) {
        this.utilityProviderInput.sendKeys(utilityProvider);
    };

    getUtilityProviderInput = function() {
        return this.utilityProviderInput.getAttribute('value');
    };

    setTariffInput = function(tariff) {
        this.tariffInput.sendKeys(tariff);
    };

    getTariffInput = function() {
        return this.tariffInput.getAttribute('value');
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

    setZipCodeInput = function(zipCode) {
        this.zipCodeInput.sendKeys(zipCode);
    };

    getZipCodeInput = function() {
        return this.zipCodeInput.getAttribute('value');
    };

    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    getArrearsInput = function() {
        return this.arrearsInput;
    };
    setDiscountInput = function(discount) {
        this.discountInput.sendKeys(discount);
    };

    getDiscountInput = function() {
        return this.discountInput.getAttribute('value');
    };

    setPriorBalanceInput = function(priorBalance) {
        this.priorBalanceInput.sendKeys(priorBalance);
    };

    getPriorBalanceInput = function() {
        return this.priorBalanceInput.getAttribute('value');
    };

    setPaymentsCreditsInput = function(paymentsCredits) {
        this.paymentsCreditsInput.sendKeys(paymentsCredits);
    };

    getPaymentsCreditsInput = function() {
        return this.paymentsCreditsInput.getAttribute('value');
    };

    setTotalNewElectricChargesInput = function(totalNewElectricCharges) {
        this.totalNewElectricChargesInput.sendKeys(totalNewElectricCharges);
    };

    getTotalNewElectricChargesInput = function() {
        return this.totalNewElectricChargesInput.getAttribute('value');
    };

    setTotalOtherChargesInput = function(totalOtherCharges) {
        this.totalOtherChargesInput.sendKeys(totalOtherCharges);
    };

    getTotalOtherChargesInput = function() {
        return this.totalOtherChargesInput.getAttribute('value');
    };

    setTaxesInput = function(taxes) {
        this.taxesInput.sendKeys(taxes);
    };

    getTaxesInput = function() {
        return this.taxesInput.getAttribute('value');
    };

    setTotalNewChargesInput = function(totalNewCharges) {
        this.totalNewChargesInput.sendKeys(totalNewCharges);
    };

    getTotalNewChargesInput = function() {
        return this.totalNewChargesInput.getAttribute('value');
    };

    setAmountDueInput = function(amountDue) {
        this.amountDueInput.sendKeys(amountDue);
    };

    getAmountDueInput = function() {
        return this.amountDueInput.getAttribute('value');
    };

    setPdfUrlInput = function(pdfUrl) {
        this.pdfUrlInput.sendKeys(pdfUrl);
    };

    getPdfUrlInput = function() {
        return this.pdfUrlInput.getAttribute('value');
    };

    setApprovedByInput = function(approvedBy) {
        this.approvedByInput.sendKeys(approvedBy);
    };

    getApprovedByInput = function() {
        return this.approvedByInput.getAttribute('value');
    };

    setApprovedDateInput = function(approvedDate) {
        this.approvedDateInput.sendKeys(approvedDate);
    };

    getApprovedDateInput = function() {
        return this.approvedDateInput.getAttribute('value');
    };

    setRejectedByInput = function(rejectedBy) {
        this.rejectedByInput.sendKeys(rejectedBy);
    };

    getRejectedByInput = function() {
        return this.rejectedByInput.getAttribute('value');
    };

    setRejectedDateInput = function(rejectedDate) {
        this.rejectedDateInput.sendKeys(rejectedDate);
    };

    getRejectedDateInput = function() {
        return this.rejectedDateInput.getAttribute('value');
    };

    setRejectionNotesInput = function(rejectionNotes) {
        this.rejectionNotesInput.sendKeys(rejectionNotes);
    };

    getRejectionNotesInput = function() {
        return this.rejectionNotesInput.getAttribute('value');
    };

    setBudderflyInvoiceStatusSelect = function(budderflyInvoiceStatus) {
        this.budderflyInvoiceStatusSelect.sendKeys(budderflyInvoiceStatus);
    };

    getBudderflyInvoiceStatusSelect = function() {
        return this.budderflyInvoiceStatusSelect.element(by.css('option:checked')).getText();
    };

    budderflyInvoiceStatusSelectLastOption = function() {
        this.budderflyInvoiceStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setDiscountAmountInput = function(discountAmount) {
        this.discountAmountInput.sendKeys(discountAmount);
    };

    getDiscountAmountInput = function() {
        return this.discountAmountInput.getAttribute('value');
    };

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setStatementDateInput = function(statementDate) {
        this.statementDateInput.sendKeys(statementDate);
    };

    getStatementDateInput = function() {
        return this.statementDateInput.getAttribute('value');
    };

    setDueDateInput = function(dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function() {
        return this.dueDateInput.getAttribute('value');
    };

    setBillingDaysInput = function(billingDays) {
        this.billingDaysInput.sendKeys(billingDays);
    };

    getBillingDaysInput = function() {
        return this.billingDaysInput.getAttribute('value');
    };

    billingCycleSelectLastOption = function() {
        this.billingCycleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    billingCycleSelectOption = function(option) {
        this.billingCycleSelect.sendKeys(option);
    };

    getBillingCycleSelect = function() {
        return this.billingCycleSelect;
    };

    getBillingCycleSelectedOption = function() {
        return this.billingCycleSelect.element(by.css('option:checked')).getText();
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
