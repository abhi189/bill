import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Performance e2e test', () => {
    let navBarPage: NavBarPage;
    let performanceDialogPage: PerformanceDialogPage;
    let performanceComponentsPage: PerformanceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Performances', () => {
        navBarPage.goToEntity('performance');
        performanceComponentsPage = new PerformanceComponentsPage();
        expect(performanceComponentsPage.getTitle()).toMatch(/billingWebApp.performance.home.title/);
    });

    it('should load create Performance dialog', () => {
        performanceComponentsPage.clickOnCreateButton();
        performanceDialogPage = new PerformanceDialogPage();
        expect(performanceDialogPage.getModalTitle()).toMatch(/billingWebApp.performance.home.createOrEditLabel/);
        performanceDialogPage.close();
    });

    it('should create and save Performances', () => {
        performanceComponentsPage.clickOnCreateButton();
        performanceDialogPage.montSelectLastOption();
        performanceDialogPage.setUsageInput('5');
        expect(performanceDialogPage.getUsageInput()).toMatch('5');
        performanceDialogPage.usageTypeSelectLastOption();
        performanceDialogPage.setActualInput('5');
        expect(performanceDialogPage.getActualInput()).toMatch('5');
        performanceDialogPage.budderflyInvoiceSelectLastOption();
        performanceDialogPage.save();
        expect(performanceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PerformanceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-performance div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PerformanceDialogPage {
    modalTitle = element(by.css('h4#myPerformanceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    montSelect = element(by.css('select#field_mont'));
    usageInput = element(by.css('input#field_usage'));
    usageTypeSelect = element(by.css('select#field_usageType'));
    actualInput = element(by.css('input#field_actual'));
    budderflyInvoiceSelect = element(by.css('select#field_budderflyInvoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMontSelect = function(mont) {
        this.montSelect.sendKeys(mont);
    };

    getMontSelect = function() {
        return this.montSelect.element(by.css('option:checked')).getText();
    };

    montSelectLastOption = function() {
        this.montSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setUsageInput = function(usage) {
        this.usageInput.sendKeys(usage);
    };

    getUsageInput = function() {
        return this.usageInput.getAttribute('value');
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
    setActualInput = function(actual) {
        this.actualInput.sendKeys(actual);
    };

    getActualInput = function() {
        return this.actualInput.getAttribute('value');
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
