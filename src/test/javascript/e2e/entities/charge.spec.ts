import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Charge e2e test', () => {
    let navBarPage: NavBarPage;
    let chargeDialogPage: ChargeDialogPage;
    let chargeComponentsPage: ChargeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Charges', () => {
        navBarPage.goToEntity('charge');
        chargeComponentsPage = new ChargeComponentsPage();
        expect(chargeComponentsPage.getTitle()).toMatch(/billingWebApp.charge.home.title/);
    });

    it('should load create Charge dialog', () => {
        chargeComponentsPage.clickOnCreateButton();
        chargeDialogPage = new ChargeDialogPage();
        expect(chargeDialogPage.getModalTitle()).toMatch(/billingWebApp.charge.home.createOrEditLabel/);
        chargeDialogPage.close();
    });

    it('should create and save Charges', () => {
        chargeComponentsPage.clickOnCreateButton();
        chargeDialogPage.setChargeIdInput('chargeId');
        expect(chargeDialogPage.getChargeIdInput()).toMatch('chargeId');
        chargeDialogPage.setLifecycleInput('lifecycle');
        expect(chargeDialogPage.getLifecycleInput()).toMatch('lifecycle');
        chargeDialogPage.setUsageUnitInput('usageUnit');
        expect(chargeDialogPage.getUsageUnitInput()).toMatch('usageUnit');
        chargeDialogPage.setMeasurementTypeInput('measurementType');
        expect(chargeDialogPage.getMeasurementTypeInput()).toMatch('measurementType');
        chargeDialogPage.setRateComponentInput('rateComponent');
        expect(chargeDialogPage.getRateComponentInput()).toMatch('rateComponent');
        chargeDialogPage.setIntervalStartInput(12310020012301);
        expect(chargeDialogPage.getIntervalStartInput()).toMatch('2001-12-31T02:30');
        chargeDialogPage.setIntervalEndInput(12310020012301);
        expect(chargeDialogPage.getIntervalEndInput()).toMatch('2001-12-31T02:30');
        chargeDialogPage.setChargeAmountInput('5');
        expect(chargeDialogPage.getChargeAmountInput()).toMatch('5');
        chargeDialogPage.setChargeAmountCurrencyInput('chargeAmountCurrency');
        expect(chargeDialogPage.getChargeAmountCurrencyInput()).toMatch('chargeAmountCurrency');
        chargeDialogPage.setChargeCurrencyInput('chargeCurrency');
        expect(chargeDialogPage.getChargeCurrencyInput()).toMatch('chargeCurrency');
        chargeDialogPage.setChargeRateCurrencyInput('chargeRateCurrency');
        expect(chargeDialogPage.getChargeRateCurrencyInput()).toMatch('chargeRateCurrency');
        chargeDialogPage.setChargeRatePerUnitInput('5');
        expect(chargeDialogPage.getChargeRatePerUnitInput()).toMatch('5');
        chargeDialogPage.setChargeRatePerUnitMultiplierInput('5');
        expect(chargeDialogPage.getChargeRatePerUnitMultiplierInput()).toMatch('5');
        chargeDialogPage.setChargeUnitsUsedInput('5');
        expect(chargeDialogPage.getChargeUnitsUsedInput()).toMatch('5');
        chargeDialogPage.setChargeActualNameInput('chargeActualName');
        expect(chargeDialogPage.getChargeActualNameInput()).toMatch('chargeActualName');
        chargeDialogPage.setThirdPartyProviderInput('thirdPartyProvider');
        expect(chargeDialogPage.getThirdPartyProviderInput()).toMatch('thirdPartyProvider');
        chargeDialogPage.setThirdPartyAccountNumberInput('thirdPartyAccountNumber');
        expect(chargeDialogPage.getThirdPartyAccountNumberInput()).toMatch('thirdPartyAccountNumber');
        chargeDialogPage
            .getIsAdjustmentChargeInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    chargeDialogPage.getIsAdjustmentChargeInput().click();
                    expect(chargeDialogPage.getIsAdjustmentChargeInput().isSelected()).toBeFalsy();
                } else {
                    chargeDialogPage.getIsAdjustmentChargeInput().click();
                    expect(chargeDialogPage.getIsAdjustmentChargeInput().isSelected()).toBeTruthy();
                }
            });
        chargeDialogPage.setCreateDateInput(12310020012301);
        expect(chargeDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        chargeDialogPage.invoiceSelectLastOption();
        chargeDialogPage.meterSelectLastOption();
        chargeDialogPage.save();
        expect(chargeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ChargeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-charge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ChargeDialogPage {
    modalTitle = element(by.css('h4#myChargeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    chargeIdInput = element(by.css('input#field_chargeId'));
    lifecycleInput = element(by.css('input#field_lifecycle'));
    usageUnitInput = element(by.css('input#field_usageUnit'));
    measurementTypeInput = element(by.css('input#field_measurementType'));
    rateComponentInput = element(by.css('input#field_rateComponent'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    chargeAmountInput = element(by.css('input#field_chargeAmount'));
    chargeAmountCurrencyInput = element(by.css('input#field_chargeAmountCurrency'));
    chargeCurrencyInput = element(by.css('input#field_chargeCurrency'));
    chargeRateCurrencyInput = element(by.css('input#field_chargeRateCurrency'));
    chargeRatePerUnitInput = element(by.css('input#field_chargeRatePerUnit'));
    chargeRatePerUnitMultiplierInput = element(by.css('input#field_chargeRatePerUnitMultiplier'));
    chargeUnitsUsedInput = element(by.css('input#field_chargeUnitsUsed'));
    chargeActualNameInput = element(by.css('input#field_chargeActualName'));
    thirdPartyProviderInput = element(by.css('input#field_thirdPartyProvider'));
    thirdPartyAccountNumberInput = element(by.css('input#field_thirdPartyAccountNumber'));
    isAdjustmentChargeInput = element(by.css('input#field_isAdjustmentCharge'));
    createDateInput = element(by.css('input#field_createDate'));
    invoiceSelect = element(by.css('select#field_invoice'));
    meterSelect = element(by.css('select#field_meter'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setChargeIdInput = function(chargeId) {
        this.chargeIdInput.sendKeys(chargeId);
    };

    getChargeIdInput = function() {
        return this.chargeIdInput.getAttribute('value');
    };

    setLifecycleInput = function(lifecycle) {
        this.lifecycleInput.sendKeys(lifecycle);
    };

    getLifecycleInput = function() {
        return this.lifecycleInput.getAttribute('value');
    };

    setUsageUnitInput = function(usageUnit) {
        this.usageUnitInput.sendKeys(usageUnit);
    };

    getUsageUnitInput = function() {
        return this.usageUnitInput.getAttribute('value');
    };

    setMeasurementTypeInput = function(measurementType) {
        this.measurementTypeInput.sendKeys(measurementType);
    };

    getMeasurementTypeInput = function() {
        return this.measurementTypeInput.getAttribute('value');
    };

    setRateComponentInput = function(rateComponent) {
        this.rateComponentInput.sendKeys(rateComponent);
    };

    getRateComponentInput = function() {
        return this.rateComponentInput.getAttribute('value');
    };

    setIntervalStartInput = function(intervalStart) {
        this.intervalStartInput.sendKeys(intervalStart);
    };

    getIntervalStartInput = function() {
        return this.intervalStartInput.getAttribute('value');
    };

    setIntervalEndInput = function(intervalEnd) {
        this.intervalEndInput.sendKeys(intervalEnd);
    };

    getIntervalEndInput = function() {
        return this.intervalEndInput.getAttribute('value');
    };

    setChargeAmountInput = function(chargeAmount) {
        this.chargeAmountInput.sendKeys(chargeAmount);
    };

    getChargeAmountInput = function() {
        return this.chargeAmountInput.getAttribute('value');
    };

    setChargeAmountCurrencyInput = function(chargeAmountCurrency) {
        this.chargeAmountCurrencyInput.sendKeys(chargeAmountCurrency);
    };

    getChargeAmountCurrencyInput = function() {
        return this.chargeAmountCurrencyInput.getAttribute('value');
    };

    setChargeCurrencyInput = function(chargeCurrency) {
        this.chargeCurrencyInput.sendKeys(chargeCurrency);
    };

    getChargeCurrencyInput = function() {
        return this.chargeCurrencyInput.getAttribute('value');
    };

    setChargeRateCurrencyInput = function(chargeRateCurrency) {
        this.chargeRateCurrencyInput.sendKeys(chargeRateCurrency);
    };

    getChargeRateCurrencyInput = function() {
        return this.chargeRateCurrencyInput.getAttribute('value');
    };

    setChargeRatePerUnitInput = function(chargeRatePerUnit) {
        this.chargeRatePerUnitInput.sendKeys(chargeRatePerUnit);
    };

    getChargeRatePerUnitInput = function() {
        return this.chargeRatePerUnitInput.getAttribute('value');
    };

    setChargeRatePerUnitMultiplierInput = function(chargeRatePerUnitMultiplier) {
        this.chargeRatePerUnitMultiplierInput.sendKeys(chargeRatePerUnitMultiplier);
    };

    getChargeRatePerUnitMultiplierInput = function() {
        return this.chargeRatePerUnitMultiplierInput.getAttribute('value');
    };

    setChargeUnitsUsedInput = function(chargeUnitsUsed) {
        this.chargeUnitsUsedInput.sendKeys(chargeUnitsUsed);
    };

    getChargeUnitsUsedInput = function() {
        return this.chargeUnitsUsedInput.getAttribute('value');
    };

    setChargeActualNameInput = function(chargeActualName) {
        this.chargeActualNameInput.sendKeys(chargeActualName);
    };

    getChargeActualNameInput = function() {
        return this.chargeActualNameInput.getAttribute('value');
    };

    setThirdPartyProviderInput = function(thirdPartyProvider) {
        this.thirdPartyProviderInput.sendKeys(thirdPartyProvider);
    };

    getThirdPartyProviderInput = function() {
        return this.thirdPartyProviderInput.getAttribute('value');
    };

    setThirdPartyAccountNumberInput = function(thirdPartyAccountNumber) {
        this.thirdPartyAccountNumberInput.sendKeys(thirdPartyAccountNumber);
    };

    getThirdPartyAccountNumberInput = function() {
        return this.thirdPartyAccountNumberInput.getAttribute('value');
    };

    getIsAdjustmentChargeInput = function() {
        return this.isAdjustmentChargeInput;
    };
    setCreateDateInput = function(createDate) {
        this.createDateInput.sendKeys(createDate);
    };

    getCreateDateInput = function() {
        return this.createDateInput.getAttribute('value');
    };

    invoiceSelectLastOption = function() {
        this.invoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    invoiceSelectOption = function(option) {
        this.invoiceSelect.sendKeys(option);
    };

    getInvoiceSelect = function() {
        return this.invoiceSelect;
    };

    getInvoiceSelectedOption = function() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    };

    meterSelectLastOption = function() {
        this.meterSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    meterSelectOption = function(option) {
        this.meterSelect.sendKeys(option);
    };

    getMeterSelect = function() {
        return this.meterSelect;
    };

    getMeterSelectedOption = function() {
        return this.meterSelect.element(by.css('option:checked')).getText();
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
