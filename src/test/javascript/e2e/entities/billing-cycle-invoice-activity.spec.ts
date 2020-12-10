import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BillingCycleInvoiceActivity e2e test', () => {
    let navBarPage: NavBarPage;
    let billingCycleInvoiceActivityDialogPage: BillingCycleInvoiceActivityDialogPage;
    let billingCycleInvoiceActivityComponentsPage: BillingCycleInvoiceActivityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BillingCycleInvoiceActivities', () => {
        navBarPage.goToEntity('billing-cycle-invoice-activity');
        billingCycleInvoiceActivityComponentsPage = new BillingCycleInvoiceActivityComponentsPage();
        expect(billingCycleInvoiceActivityComponentsPage.getTitle()).toMatch(/billingWebApp.billingCycleInvoiceActivity.home.title/);
    });

    it('should load create BillingCycleInvoiceActivity dialog', () => {
        billingCycleInvoiceActivityComponentsPage.clickOnCreateButton();
        billingCycleInvoiceActivityDialogPage = new BillingCycleInvoiceActivityDialogPage();
        expect(billingCycleInvoiceActivityDialogPage.getModalTitle()).toMatch(
            /billingWebApp.billingCycleInvoiceActivity.home.createOrEditLabel/
        );
        billingCycleInvoiceActivityDialogPage.close();
    });

    it('should create and save BillingCycleInvoiceActivities', () => {
        billingCycleInvoiceActivityComponentsPage.clickOnCreateButton();
        billingCycleInvoiceActivityDialogPage.setUserInput('user');
        expect(billingCycleInvoiceActivityDialogPage.getUserInput()).toMatch('user');
        billingCycleInvoiceActivityDialogPage.setPdfLinkInput('pdfLink');
        expect(billingCycleInvoiceActivityDialogPage.getPdfLinkInput()).toMatch('pdfLink');
        billingCycleInvoiceActivityDialogPage.activitySelectLastOption();
        billingCycleInvoiceActivityDialogPage.levelSelectLastOption();
        billingCycleInvoiceActivityDialogPage.setMessageInput('message');
        expect(billingCycleInvoiceActivityDialogPage.getMessageInput()).toMatch('message');
        billingCycleInvoiceActivityDialogPage.setActivityDateInput(12310020012301);
        expect(billingCycleInvoiceActivityDialogPage.getActivityDateInput()).toMatch('2001-12-31T02:30');
        billingCycleInvoiceActivityDialogPage.budderflyInvoiceSelectLastOption();
        billingCycleInvoiceActivityDialogPage.save();
        expect(billingCycleInvoiceActivityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BillingCycleInvoiceActivityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-billing-cycle-invoice-activity div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BillingCycleInvoiceActivityDialogPage {
    modalTitle = element(by.css('h4#myBillingCycleInvoiceActivityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userInput = element(by.css('input#field_user'));
    pdfLinkInput = element(by.css('input#field_pdfLink'));
    activitySelect = element(by.css('select#field_activity'));
    levelSelect = element(by.css('select#field_level'));
    messageInput = element(by.css('input#field_message'));
    activityDateInput = element(by.css('input#field_activityDate'));
    budderflyInvoiceSelect = element(by.css('select#field_budderflyInvoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    };

    getUserInput = function() {
        return this.userInput.getAttribute('value');
    };

    setPdfLinkInput = function(pdfLink) {
        this.pdfLinkInput.sendKeys(pdfLink);
    };

    getPdfLinkInput = function() {
        return this.pdfLinkInput.getAttribute('value');
    };

    setActivitySelect = function(activity) {
        this.activitySelect.sendKeys(activity);
    };

    getActivitySelect = function() {
        return this.activitySelect.element(by.css('option:checked')).getText();
    };

    activitySelectLastOption = function() {
        this.activitySelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setLevelSelect = function(level) {
        this.levelSelect.sendKeys(level);
    };

    getLevelSelect = function() {
        return this.levelSelect.element(by.css('option:checked')).getText();
    };

    levelSelectLastOption = function() {
        this.levelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setActivityDateInput = function(activityDate) {
        this.activityDateInput.sendKeys(activityDate);
    };

    getActivityDateInput = function() {
        return this.activityDateInput.getAttribute('value');
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
