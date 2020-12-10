import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Consumption e2e test', () => {
    let navBarPage: NavBarPage;
    let consumptionDialogPage: ConsumptionDialogPage;
    let consumptionComponentsPage: ConsumptionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Consumptions', () => {
        navBarPage.goToEntity('consumption');
        consumptionComponentsPage = new ConsumptionComponentsPage();
        expect(consumptionComponentsPage.getTitle()).toMatch(/billingWebApp.consumption.home.title/);
    });

    it('should load create Consumption dialog', () => {
        consumptionComponentsPage.clickOnCreateButton();
        consumptionDialogPage = new ConsumptionDialogPage();
        expect(consumptionDialogPage.getModalTitle()).toMatch(/billingWebApp.consumption.home.createOrEditLabel/);
        consumptionDialogPage.close();
    });

    it('should create and save Consumptions', () => {
        consumptionComponentsPage.clickOnCreateButton();
        consumptionDialogPage.setMeasurementTypeInput('measurementType');
        expect(consumptionDialogPage.getMeasurementTypeInput()).toMatch('measurementType');
        consumptionDialogPage.setRateComponentInput('rateComponent');
        expect(consumptionDialogPage.getRateComponentInput()).toMatch('rateComponent');
        consumptionDialogPage.setIntervalStartInput(12310020012301);
        expect(consumptionDialogPage.getIntervalStartInput()).toMatch('2001-12-31T02:30');
        consumptionDialogPage.setIntervalEndInput(12310020012301);
        expect(consumptionDialogPage.getIntervalEndInput()).toMatch('2001-12-31T02:30');
        consumptionDialogPage.setUsageAmountInput('5');
        expect(consumptionDialogPage.getUsageAmountInput()).toMatch('5');
        consumptionDialogPage.setLoadFactorInput('5');
        expect(consumptionDialogPage.getLoadFactorInput()).toMatch('5');
        consumptionDialogPage.setMeterReadCurrentInput('5');
        expect(consumptionDialogPage.getMeterReadCurrentInput()).toMatch('5');
        consumptionDialogPage.setMeterReadPreviousInput('5');
        expect(consumptionDialogPage.getMeterReadPreviousInput()).toMatch('5');
        consumptionDialogPage.setUsageConstantMultiplierInput('5');
        expect(consumptionDialogPage.getUsageConstantMultiplierInput()).toMatch('5');
        consumptionDialogPage.setUsageConversionMultiplierInput('5');
        expect(consumptionDialogPage.getUsageConversionMultiplierInput()).toMatch('5');
        consumptionDialogPage.invoiceSelectLastOption();
        consumptionDialogPage.save();
        expect(consumptionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConsumptionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-consumption div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ConsumptionDialogPage {
    modalTitle = element(by.css('h4#myConsumptionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    measurementTypeInput = element(by.css('input#field_measurementType'));
    rateComponentInput = element(by.css('input#field_rateComponent'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    usageAmountInput = element(by.css('input#field_usageAmount'));
    loadFactorInput = element(by.css('input#field_loadFactor'));
    meterReadCurrentInput = element(by.css('input#field_meterReadCurrent'));
    meterReadPreviousInput = element(by.css('input#field_meterReadPrevious'));
    usageConstantMultiplierInput = element(by.css('input#field_usageConstantMultiplier'));
    usageConversionMultiplierInput = element(by.css('input#field_usageConversionMultiplier'));
    invoiceSelect = element(by.css('select#field_invoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setUsageAmountInput = function(usageAmount) {
        this.usageAmountInput.sendKeys(usageAmount);
    };

    getUsageAmountInput = function() {
        return this.usageAmountInput.getAttribute('value');
    };

    setLoadFactorInput = function(loadFactor) {
        this.loadFactorInput.sendKeys(loadFactor);
    };

    getLoadFactorInput = function() {
        return this.loadFactorInput.getAttribute('value');
    };

    setMeterReadCurrentInput = function(meterReadCurrent) {
        this.meterReadCurrentInput.sendKeys(meterReadCurrent);
    };

    getMeterReadCurrentInput = function() {
        return this.meterReadCurrentInput.getAttribute('value');
    };

    setMeterReadPreviousInput = function(meterReadPrevious) {
        this.meterReadPreviousInput.sendKeys(meterReadPrevious);
    };

    getMeterReadPreviousInput = function() {
        return this.meterReadPreviousInput.getAttribute('value');
    };

    setUsageConstantMultiplierInput = function(usageConstantMultiplier) {
        this.usageConstantMultiplierInput.sendKeys(usageConstantMultiplier);
    };

    getUsageConstantMultiplierInput = function() {
        return this.usageConstantMultiplierInput.getAttribute('value');
    };

    setUsageConversionMultiplierInput = function(usageConversionMultiplier) {
        this.usageConversionMultiplierInput.sendKeys(usageConversionMultiplier);
    };

    getUsageConversionMultiplierInput = function() {
        return this.usageConversionMultiplierInput.getAttribute('value');
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
