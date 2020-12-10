import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StagingCharge e2e test', () => {
    let navBarPage: NavBarPage;
    let stagingChargeDialogPage: StagingChargeDialogPage;
    let stagingChargeComponentsPage: StagingChargeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StagingCharges', () => {
        navBarPage.goToEntity('staging-charge');
        stagingChargeComponentsPage = new StagingChargeComponentsPage();
        expect(stagingChargeComponentsPage.getTitle()).toMatch(/billingWebApp.stagingCharge.home.title/);
    });

    it('should load create StagingCharge dialog', () => {
        stagingChargeComponentsPage.clickOnCreateButton();
        stagingChargeDialogPage = new StagingChargeDialogPage();
        expect(stagingChargeDialogPage.getModalTitle()).toMatch(/billingWebApp.stagingCharge.home.createOrEditLabel/);
        stagingChargeDialogPage.close();
    });

    it('should create and save StagingCharges', () => {
        stagingChargeComponentsPage.clickOnCreateButton();
        stagingChargeDialogPage.setUsageUnitInput('usageUnit');
        expect(stagingChargeDialogPage.getUsageUnitInput()).toMatch('usageUnit');
        stagingChargeDialogPage.setMeasurementTypeInput('measurementType');
        expect(stagingChargeDialogPage.getMeasurementTypeInput()).toMatch('measurementType');
        stagingChargeDialogPage.setRateComponentInput('rateComponent');
        expect(stagingChargeDialogPage.getRateComponentInput()).toMatch('rateComponent');
        stagingChargeDialogPage.setIntervalStartInput('2000-12-31');
        expect(stagingChargeDialogPage.getIntervalStartInput()).toMatch('2000-12-31');
        stagingChargeDialogPage.setIntervalEndInput('2000-12-31');
        expect(stagingChargeDialogPage.getIntervalEndInput()).toMatch('2000-12-31');
        stagingChargeDialogPage.setChargeAmountInput('5');
        expect(stagingChargeDialogPage.getChargeAmountInput()).toMatch('5');
        stagingChargeDialogPage.setChargeCurrencyInput('chargeCurrency');
        expect(stagingChargeDialogPage.getChargeCurrencyInput()).toMatch('chargeCurrency');
        stagingChargeDialogPage.setChargeRatePerUnitInput('5');
        expect(stagingChargeDialogPage.getChargeRatePerUnitInput()).toMatch('5');
        stagingChargeDialogPage.setChargeRatePerUnitMultiplierInput('5');
        expect(stagingChargeDialogPage.getChargeRatePerUnitMultiplierInput()).toMatch('5');
        stagingChargeDialogPage.setChargeUnitsUsedInput('5');
        expect(stagingChargeDialogPage.getChargeUnitsUsedInput()).toMatch('5');
        stagingChargeDialogPage.setChargeActualNameInput('chargeActualName');
        expect(stagingChargeDialogPage.getChargeActualNameInput()).toMatch('chargeActualName');
        stagingChargeDialogPage.setChargeAmountCurrencyInput('chargeAmountCurrency');
        expect(stagingChargeDialogPage.getChargeAmountCurrencyInput()).toMatch('chargeAmountCurrency');
        stagingChargeDialogPage.setChargeIdInput('chargeId');
        expect(stagingChargeDialogPage.getChargeIdInput()).toMatch('chargeId');
        stagingChargeDialogPage.setChargeRateCurrencyInput('chargeRateCurrency');
        expect(stagingChargeDialogPage.getChargeRateCurrencyInput()).toMatch('chargeRateCurrency');
        stagingChargeDialogPage
            .getIsAdjustmentChargeInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    stagingChargeDialogPage.getIsAdjustmentChargeInput().click();
                    expect(stagingChargeDialogPage.getIsAdjustmentChargeInput().isSelected()).toBeFalsy();
                } else {
                    stagingChargeDialogPage.getIsAdjustmentChargeInput().click();
                    expect(stagingChargeDialogPage.getIsAdjustmentChargeInput().isSelected()).toBeTruthy();
                }
            });
        stagingChargeDialogPage.setLifecycleInput('lifecycle');
        expect(stagingChargeDialogPage.getLifecycleInput()).toMatch('lifecycle');
        stagingChargeDialogPage.setThirdPartyAccountNumberInput('thirdPartyAccountNumber');
        expect(stagingChargeDialogPage.getThirdPartyAccountNumberInput()).toMatch('thirdPartyAccountNumber');
        stagingChargeDialogPage.setThirdPartyProviderInput('thirdPartyProvider');
        expect(stagingChargeDialogPage.getThirdPartyProviderInput()).toMatch('thirdPartyProvider');
        stagingChargeDialogPage.setCreateDateInput(12310020012301);
        expect(stagingChargeDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        stagingChargeDialogPage.setLastModifiedInput(12310020012301);
        expect(stagingChargeDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        stagingChargeDialogPage.invoiceSelectLastOption();
        stagingChargeDialogPage.meterSelectLastOption();
        stagingChargeDialogPage.save();
        expect(stagingChargeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StagingChargeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-staging-charge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StagingChargeDialogPage {
    modalTitle = element(by.css('h4#myStagingChargeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usageUnitInput = element(by.css('input#field_usageUnit'));
    measurementTypeInput = element(by.css('input#field_measurementType'));
    rateComponentInput = element(by.css('input#field_rateComponent'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    chargeAmountInput = element(by.css('input#field_chargeAmount'));
    chargeCurrencyInput = element(by.css('input#field_chargeCurrency'));
    chargeRatePerUnitInput = element(by.css('input#field_chargeRatePerUnit'));
    chargeRatePerUnitMultiplierInput = element(by.css('input#field_chargeRatePerUnitMultiplier'));
    chargeUnitsUsedInput = element(by.css('input#field_chargeUnitsUsed'));
    chargeActualNameInput = element(by.css('input#field_chargeActualName'));
    chargeAmountCurrencyInput = element(by.css('input#field_chargeAmountCurrency'));
    chargeIdInput = element(by.css('input#field_chargeId'));
    chargeRateCurrencyInput = element(by.css('input#field_chargeRateCurrency'));
    isAdjustmentChargeInput = element(by.css('input#field_isAdjustmentCharge'));
    lifecycleInput = element(by.css('input#field_lifecycle'));
    thirdPartyAccountNumberInput = element(by.css('input#field_thirdPartyAccountNumber'));
    thirdPartyProviderInput = element(by.css('input#field_thirdPartyProvider'));
    createDateInput = element(by.css('input#field_createDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    invoiceSelect = element(by.css('select#field_invoice'));
    meterSelect = element(by.css('select#field_meter'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setChargeCurrencyInput = function(chargeCurrency) {
        this.chargeCurrencyInput.sendKeys(chargeCurrency);
    };

    getChargeCurrencyInput = function() {
        return this.chargeCurrencyInput.getAttribute('value');
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

    setChargeAmountCurrencyInput = function(chargeAmountCurrency) {
        this.chargeAmountCurrencyInput.sendKeys(chargeAmountCurrency);
    };

    getChargeAmountCurrencyInput = function() {
        return this.chargeAmountCurrencyInput.getAttribute('value');
    };

    setChargeIdInput = function(chargeId) {
        this.chargeIdInput.sendKeys(chargeId);
    };

    getChargeIdInput = function() {
        return this.chargeIdInput.getAttribute('value');
    };

    setChargeRateCurrencyInput = function(chargeRateCurrency) {
        this.chargeRateCurrencyInput.sendKeys(chargeRateCurrency);
    };

    getChargeRateCurrencyInput = function() {
        return this.chargeRateCurrencyInput.getAttribute('value');
    };

    getIsAdjustmentChargeInput = function() {
        return this.isAdjustmentChargeInput;
    };
    setLifecycleInput = function(lifecycle) {
        this.lifecycleInput.sendKeys(lifecycle);
    };

    getLifecycleInput = function() {
        return this.lifecycleInput.getAttribute('value');
    };

    setThirdPartyAccountNumberInput = function(thirdPartyAccountNumber) {
        this.thirdPartyAccountNumberInput.sendKeys(thirdPartyAccountNumber);
    };

    getThirdPartyAccountNumberInput = function() {
        return this.thirdPartyAccountNumberInput.getAttribute('value');
    };

    setThirdPartyProviderInput = function(thirdPartyProvider) {
        this.thirdPartyProviderInput.sendKeys(thirdPartyProvider);
    };

    getThirdPartyProviderInput = function() {
        return this.thirdPartyProviderInput.getAttribute('value');
    };

    setCreateDateInput = function(createDate) {
        this.createDateInput.sendKeys(createDate);
    };

    getCreateDateInput = function() {
        return this.createDateInput.getAttribute('value');
    };

    setLastModifiedInput = function(lastModified) {
        this.lastModifiedInput.sendKeys(lastModified);
    };

    getLastModifiedInput = function() {
        return this.lastModifiedInput.getAttribute('value');
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
