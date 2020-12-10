import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BudderflyCharge e2e test', () => {
    let navBarPage: NavBarPage;
    let budderflyChargeDialogPage: BudderflyChargeDialogPage;
    let budderflyChargeComponentsPage: BudderflyChargeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BudderflyCharges', () => {
        navBarPage.goToEntity('budderfly-charge');
        budderflyChargeComponentsPage = new BudderflyChargeComponentsPage();
        expect(budderflyChargeComponentsPage.getTitle()).toMatch(/billingWebApp.budderflyCharge.home.title/);
    });

    it('should load create BudderflyCharge dialog', () => {
        budderflyChargeComponentsPage.clickOnCreateButton();
        budderflyChargeDialogPage = new BudderflyChargeDialogPage();
        expect(budderflyChargeDialogPage.getModalTitle()).toMatch(/billingWebApp.budderflyCharge.home.createOrEditLabel/);
        budderflyChargeDialogPage.close();
    });

    it('should create and save BudderflyCharges', () => {
        budderflyChargeComponentsPage.clickOnCreateButton();
        budderflyChargeDialogPage.setNameInput('name');
        expect(budderflyChargeDialogPage.getNameInput()).toMatch('name');
        budderflyChargeDialogPage.setTierInput('tier');
        expect(budderflyChargeDialogPage.getTierInput()).toMatch('tier');
        budderflyChargeDialogPage.setUsageAmountInput('5');
        expect(budderflyChargeDialogPage.getUsageAmountInput()).toMatch('5');
        budderflyChargeDialogPage.usageTypeSelectLastOption();
        budderflyChargeDialogPage.setRateInput('5');
        expect(budderflyChargeDialogPage.getRateInput()).toMatch('5');
        budderflyChargeDialogPage.setTotalInput('5');
        expect(budderflyChargeDialogPage.getTotalInput()).toMatch('5');
        budderflyChargeDialogPage.invoiceSectionSelectLastOption();
        budderflyChargeDialogPage.setDiscountInput('5');
        expect(budderflyChargeDialogPage.getDiscountInput()).toMatch('5');
        budderflyChargeDialogPage.setDiscountAmountInput('5');
        expect(budderflyChargeDialogPage.getDiscountAmountInput()).toMatch('5');
        budderflyChargeDialogPage.setChargeIdInput('chargeId');
        expect(budderflyChargeDialogPage.getChargeIdInput()).toMatch('chargeId');
        budderflyChargeDialogPage.setChargeActualNameInput('chargeActualName');
        expect(budderflyChargeDialogPage.getChargeActualNameInput()).toMatch('chargeActualName');
        budderflyChargeDialogPage.setUsageInput('5');
        expect(budderflyChargeDialogPage.getUsageInput()).toMatch('5');
        budderflyChargeDialogPage.monthSelectLastOption();
        budderflyChargeDialogPage.setRateComponentInput('rateComponent');
        expect(budderflyChargeDialogPage.getRateComponentInput()).toMatch('rateComponent');
        budderflyChargeDialogPage.budderflyInvoiceSelectLastOption();
        budderflyChargeDialogPage.save();
        expect(budderflyChargeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BudderflyChargeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-budderfly-charge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BudderflyChargeDialogPage {
    modalTitle = element(by.css('h4#myBudderflyChargeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    tierInput = element(by.css('input#field_tier'));
    usageAmountInput = element(by.css('input#field_usageAmount'));
    usageTypeSelect = element(by.css('select#field_usageType'));
    rateInput = element(by.css('input#field_rate'));
    totalInput = element(by.css('input#field_total'));
    invoiceSectionSelect = element(by.css('select#field_invoiceSection'));
    discountInput = element(by.css('input#field_discount'));
    discountAmountInput = element(by.css('input#field_discountAmount'));
    chargeIdInput = element(by.css('input#field_chargeId'));
    chargeActualNameInput = element(by.css('input#field_chargeActualName'));
    usageInput = element(by.css('input#field_usage'));
    monthSelect = element(by.css('select#field_month'));
    rateComponentInput = element(by.css('input#field_rateComponent'));
    budderflyInvoiceSelect = element(by.css('select#field_budderflyInvoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTierInput = function(tier) {
        this.tierInput.sendKeys(tier);
    };

    getTierInput = function() {
        return this.tierInput.getAttribute('value');
    };

    setUsageAmountInput = function(usageAmount) {
        this.usageAmountInput.sendKeys(usageAmount);
    };

    getUsageAmountInput = function() {
        return this.usageAmountInput.getAttribute('value');
    };

    setUsageTypeSelect = function(usageType) {
        this.usageTypeSelect.sendKeys(usageType);
    };

    getUsageTypeSelect = function() {
        return this.usageTypeSelect.element(by.css('option:checked')).getText();
    };

    usageTypeSelectLastOption = function() {
        this.usageTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setRateInput = function(rate) {
        this.rateInput.sendKeys(rate);
    };

    getRateInput = function() {
        return this.rateInput.getAttribute('value');
    };

    setTotalInput = function(total) {
        this.totalInput.sendKeys(total);
    };

    getTotalInput = function() {
        return this.totalInput.getAttribute('value');
    };

    setInvoiceSectionSelect = function(invoiceSection) {
        this.invoiceSectionSelect.sendKeys(invoiceSection);
    };

    getInvoiceSectionSelect = function() {
        return this.invoiceSectionSelect.element(by.css('option:checked')).getText();
    };

    invoiceSectionSelectLastOption = function() {
        this.invoiceSectionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setDiscountInput = function(discount) {
        this.discountInput.sendKeys(discount);
    };

    getDiscountInput = function() {
        return this.discountInput.getAttribute('value');
    };

    setDiscountAmountInput = function(discountAmount) {
        this.discountAmountInput.sendKeys(discountAmount);
    };

    getDiscountAmountInput = function() {
        return this.discountAmountInput.getAttribute('value');
    };

    setChargeIdInput = function(chargeId) {
        this.chargeIdInput.sendKeys(chargeId);
    };

    getChargeIdInput = function() {
        return this.chargeIdInput.getAttribute('value');
    };

    setChargeActualNameInput = function(chargeActualName) {
        this.chargeActualNameInput.sendKeys(chargeActualName);
    };

    getChargeActualNameInput = function() {
        return this.chargeActualNameInput.getAttribute('value');
    };

    setUsageInput = function(usage) {
        this.usageInput.sendKeys(usage);
    };

    getUsageInput = function() {
        return this.usageInput.getAttribute('value');
    };

    setMonthSelect = function(month) {
        this.monthSelect.sendKeys(month);
    };

    getMonthSelect = function() {
        return this.monthSelect.element(by.css('option:checked')).getText();
    };

    monthSelectLastOption = function() {
        this.monthSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setRateComponentInput = function(rateComponent) {
        this.rateComponentInput.sendKeys(rateComponent);
    };

    getRateComponentInput = function() {
        return this.rateComponentInput.getAttribute('value');
    };

    budderflyInvoiceSelectLastOption = function() {
        this.budderflyInvoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    budderflyInvoiceSelectOption = function(option) {
        this.budderflyInvoiceSelect.sendKeys(option);
    };

    getBudderflyInvoiceSelect = function() {
        return this.budderflyInvoiceSelect;
    };

    getBudderflyInvoiceSelectedOption = function() {
        return this.budderflyInvoiceSelect.element(by.css('option:checked')).getText();
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
