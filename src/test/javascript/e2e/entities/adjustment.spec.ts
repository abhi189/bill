import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Adjustment e2e test', () => {
    let navBarPage: NavBarPage;
    let adjustmentDialogPage: AdjustmentDialogPage;
    let adjustmentComponentsPage: AdjustmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Adjustments', () => {
        navBarPage.goToEntity('adjustment');
        adjustmentComponentsPage = new AdjustmentComponentsPage();
        expect(adjustmentComponentsPage.getTitle()).toMatch(/billingWebApp.adjustment.home.title/);
    });

    it('should load create Adjustment dialog', () => {
        adjustmentComponentsPage.clickOnCreateButton();
        adjustmentDialogPage = new AdjustmentDialogPage();
        expect(adjustmentDialogPage.getModalTitle()).toMatch(/billingWebApp.adjustment.home.createOrEditLabel/);
        adjustmentDialogPage.close();
    });

    it('should create and save Adjustments', () => {
        adjustmentComponentsPage.clickOnCreateButton();
        adjustmentDialogPage.setNameInput('name');
        expect(adjustmentDialogPage.getNameInput()).toMatch('name');
        adjustmentDialogPage.setTotalInput('5');
        expect(adjustmentDialogPage.getTotalInput()).toMatch('5');
        adjustmentDialogPage.invoiceSectionSelectLastOption();
        adjustmentDialogPage.save();
        expect(adjustmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AdjustmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-adjustment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AdjustmentDialogPage {
    modalTitle = element(by.css('h4#myAdjustmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    totalInput = element(by.css('input#field_total'));
    invoiceSectionSelect = element(by.css('select#field_invoiceSection'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
