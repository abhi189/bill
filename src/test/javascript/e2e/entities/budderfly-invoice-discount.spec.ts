import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BudderflyInvoiceDiscount e2e test', () => {
    let navBarPage: NavBarPage;
    let budderflyInvoiceDiscountDialogPage: BudderflyInvoiceDiscountDialogPage;
    let budderflyInvoiceDiscountComponentsPage: BudderflyInvoiceDiscountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BudderflyInvoiceDiscounts', () => {
        navBarPage.goToEntity('budderfly-invoice-discount');
        budderflyInvoiceDiscountComponentsPage = new BudderflyInvoiceDiscountComponentsPage();
        expect(budderflyInvoiceDiscountComponentsPage.getTitle()).toMatch(/billingWebApp.budderflyInvoiceDiscount.home.title/);
    });

    it('should load create BudderflyInvoiceDiscount dialog', () => {
        budderflyInvoiceDiscountComponentsPage.clickOnCreateButton();
        budderflyInvoiceDiscountDialogPage = new BudderflyInvoiceDiscountDialogPage();
        expect(budderflyInvoiceDiscountDialogPage.getModalTitle()).toMatch(/billingWebApp.budderflyInvoiceDiscount.home.createOrEditLabel/);
        budderflyInvoiceDiscountDialogPage.close();
    });

    it('should create and save BudderflyInvoiceDiscounts', () => {
        budderflyInvoiceDiscountComponentsPage.clickOnCreateButton();
        budderflyInvoiceDiscountDialogPage.setDiscountPctInput('5');
        expect(budderflyInvoiceDiscountDialogPage.getDiscountPctInput()).toMatch('5');
        budderflyInvoiceDiscountDialogPage.setDiscountSavingInput('5');
        expect(budderflyInvoiceDiscountDialogPage.getDiscountSavingInput()).toMatch('5');
        budderflyInvoiceDiscountDialogPage.relatedBudderflyInvoiceSelectLastOption();
        budderflyInvoiceDiscountDialogPage.save();
        expect(budderflyInvoiceDiscountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BudderflyInvoiceDiscountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-budderfly-invoice-discount div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BudderflyInvoiceDiscountDialogPage {
    modalTitle = element(by.css('h4#myBudderflyInvoiceDiscountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    discountPctInput = element(by.css('input#field_discountPct'));
    discountSavingInput = element(by.css('input#field_discountSaving'));
    relatedBudderflyInvoiceSelect = element(by.css('select#field_relatedBudderflyInvoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDiscountPctInput = function(discountPct) {
        this.discountPctInput.sendKeys(discountPct);
    };

    getDiscountPctInput = function() {
        return this.discountPctInput.getAttribute('value');
    };

    setDiscountSavingInput = function(discountSaving) {
        this.discountSavingInput.sendKeys(discountSaving);
    };

    getDiscountSavingInput = function() {
        return this.discountSavingInput.getAttribute('value');
    };

    relatedBudderflyInvoiceSelectLastOption = function() {
        this.relatedBudderflyInvoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    relatedBudderflyInvoiceSelectOption = function(option) {
        this.relatedBudderflyInvoiceSelect.sendKeys(option);
    };

    getRelatedBudderflyInvoiceSelect = function() {
        return this.relatedBudderflyInvoiceSelect;
    };

    getRelatedBudderflyInvoiceSelectedOption = function() {
        return this.relatedBudderflyInvoiceSelect.element(by.css('option:checked')).getText();
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
