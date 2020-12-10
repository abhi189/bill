import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Invoice e2e test', () => {
    let navBarPage: NavBarPage;
    let invoiceDialogPage: InvoiceDialogPage;
    let invoiceComponentsPage: InvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invoices', () => {
        navBarPage.goToEntity('invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(invoiceComponentsPage.getTitle()).toMatch(/billingWebApp.invoice.home.title/);
    });

    it('should load create Invoice dialog', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage = new InvoiceDialogPage();
        expect(invoiceDialogPage.getModalTitle()).toMatch(/billingWebApp.invoice.home.createOrEditLabel/);
        invoiceDialogPage.close();
    });

    it('should create and save Invoices', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage.setElectricSupplierInput('electricSupplier');
        expect(invoiceDialogPage.getElectricSupplierInput()).toMatch('electricSupplier');
        invoiceDialogPage.setIntervalStartInput('2000-12-31');
        expect(invoiceDialogPage.getIntervalStartInput()).toMatch('2000-12-31');
        invoiceDialogPage.setIntervalEndInput('2000-12-31');
        expect(invoiceDialogPage.getIntervalEndInput()).toMatch('2000-12-31');
        invoiceDialogPage.setBillingDaysInput('5');
        expect(invoiceDialogPage.getBillingDaysInput()).toMatch('5');
        invoiceDialogPage.setNewChargesInput('5');
        expect(invoiceDialogPage.getNewChargesInput()).toMatch('5');
        invoiceDialogPage.setPeakKWHInput('5');
        expect(invoiceDialogPage.getPeakKWHInput()).toMatch('5');
        invoiceDialogPage.setMidPeakKWHInput('5');
        expect(invoiceDialogPage.getMidPeakKWHInput()).toMatch('5');
        invoiceDialogPage.setOffPeakKWHInput('5');
        expect(invoiceDialogPage.getOffPeakKWHInput()).toMatch('5');
        invoiceDialogPage.setTotalKWHInput('5');
        expect(invoiceDialogPage.getTotalKWHInput()).toMatch('5');
        invoiceDialogPage.setPeakKWInput('5');
        expect(invoiceDialogPage.getPeakKWInput()).toMatch('5');
        invoiceDialogPage.setMidPeakKWInput('5');
        expect(invoiceDialogPage.getMidPeakKWInput()).toMatch('5');
        invoiceDialogPage.setOffPeakKWInput('5');
        expect(invoiceDialogPage.getOffPeakKWInput()).toMatch('5');
        invoiceDialogPage.setMaxKWInput('5');
        expect(invoiceDialogPage.getMaxKWInput()).toMatch('5');
        invoiceDialogPage.setUrjanetIdInput('urjanetId');
        expect(invoiceDialogPage.getUrjanetIdInput()).toMatch('urjanetId');
        invoiceDialogPage.siteAccountSelectLastOption();
        invoiceDialogPage.save();
        expect(invoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceDialogPage {
    modalTitle = element(by.css('h4#myInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    electricSupplierInput = element(by.css('input#field_electricSupplier'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    billingDaysInput = element(by.css('input#field_billingDays'));
    newChargesInput = element(by.css('input#field_newCharges'));
    peakKWHInput = element(by.css('input#field_peakKWH'));
    midPeakKWHInput = element(by.css('input#field_midPeakKWH'));
    offPeakKWHInput = element(by.css('input#field_offPeakKWH'));
    totalKWHInput = element(by.css('input#field_totalKWH'));
    peakKWInput = element(by.css('input#field_peakKW'));
    midPeakKWInput = element(by.css('input#field_midPeakKW'));
    offPeakKWInput = element(by.css('input#field_offPeakKW'));
    maxKWInput = element(by.css('input#field_maxKW'));
    urjanetIdInput = element(by.css('input#field_urjanetId'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setElectricSupplierInput = function(electricSupplier) {
        this.electricSupplierInput.sendKeys(electricSupplier);
    };

    getElectricSupplierInput = function() {
        return this.electricSupplierInput.getAttribute('value');
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

    setBillingDaysInput = function(billingDays) {
        this.billingDaysInput.sendKeys(billingDays);
    };

    getBillingDaysInput = function() {
        return this.billingDaysInput.getAttribute('value');
    };

    setNewChargesInput = function(newCharges) {
        this.newChargesInput.sendKeys(newCharges);
    };

    getNewChargesInput = function() {
        return this.newChargesInput.getAttribute('value');
    };

    setPeakKWHInput = function(peakKWH) {
        this.peakKWHInput.sendKeys(peakKWH);
    };

    getPeakKWHInput = function() {
        return this.peakKWHInput.getAttribute('value');
    };

    setMidPeakKWHInput = function(midPeakKWH) {
        this.midPeakKWHInput.sendKeys(midPeakKWH);
    };

    getMidPeakKWHInput = function() {
        return this.midPeakKWHInput.getAttribute('value');
    };

    setOffPeakKWHInput = function(offPeakKWH) {
        this.offPeakKWHInput.sendKeys(offPeakKWH);
    };

    getOffPeakKWHInput = function() {
        return this.offPeakKWHInput.getAttribute('value');
    };

    setTotalKWHInput = function(totalKWH) {
        this.totalKWHInput.sendKeys(totalKWH);
    };

    getTotalKWHInput = function() {
        return this.totalKWHInput.getAttribute('value');
    };

    setPeakKWInput = function(peakKW) {
        this.peakKWInput.sendKeys(peakKW);
    };

    getPeakKWInput = function() {
        return this.peakKWInput.getAttribute('value');
    };

    setMidPeakKWInput = function(midPeakKW) {
        this.midPeakKWInput.sendKeys(midPeakKW);
    };

    getMidPeakKWInput = function() {
        return this.midPeakKWInput.getAttribute('value');
    };

    setOffPeakKWInput = function(offPeakKW) {
        this.offPeakKWInput.sendKeys(offPeakKW);
    };

    getOffPeakKWInput = function() {
        return this.offPeakKWInput.getAttribute('value');
    };

    setMaxKWInput = function(maxKW) {
        this.maxKWInput.sendKeys(maxKW);
    };

    getMaxKWInput = function() {
        return this.maxKWInput.getAttribute('value');
    };

    setUrjanetIdInput = function(urjanetId) {
        this.urjanetIdInput.sendKeys(urjanetId);
    };

    getUrjanetIdInput = function() {
        return this.urjanetIdInput.getAttribute('value');
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
