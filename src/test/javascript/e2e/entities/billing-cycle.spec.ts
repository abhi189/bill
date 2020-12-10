import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BillingCycle e2e test', () => {
    let navBarPage: NavBarPage;
    let billingCycleDialogPage: BillingCycleDialogPage;
    let billingCycleComponentsPage: BillingCycleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BillingCycles', () => {
        navBarPage.goToEntity('billing-cycle');
        billingCycleComponentsPage = new BillingCycleComponentsPage();
        expect(billingCycleComponentsPage.getTitle()).toMatch(/billingWebApp.billingCycle.home.title/);
    });

    it('should load create BillingCycle dialog', () => {
        billingCycleComponentsPage.clickOnCreateButton();
        billingCycleDialogPage = new BillingCycleDialogPage();
        expect(billingCycleDialogPage.getModalTitle()).toMatch(/billingWebApp.billingCycle.home.createOrEditLabel/);
        billingCycleDialogPage.close();
    });

    it('should create and save BillingCycles', () => {
        billingCycleComponentsPage.clickOnCreateButton();
        billingCycleDialogPage.setNameInput('name');
        expect(billingCycleDialogPage.getNameInput()).toMatch('name');
        billingCycleDialogPage.setDueDateInput('2000-12-31');
        expect(billingCycleDialogPage.getDueDateInput()).toMatch('2000-12-31');
        billingCycleDialogPage.setStatementDateInput('2000-12-31');
        expect(billingCycleDialogPage.getStatementDateInput()).toMatch('2000-12-31');
        billingCycleDialogPage.setNotesInput('notes');
        expect(billingCycleDialogPage.getNotesInput()).toMatch('notes');
        billingCycleDialogPage.setMessageInput('message');
        expect(billingCycleDialogPage.getMessageInput()).toMatch('message');
        billingCycleDialogPage.statusSelectLastOption();
        billingCycleDialogPage.save();
        expect(billingCycleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BillingCycleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-billing-cycle div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BillingCycleDialogPage {
    modalTitle = element(by.css('h4#myBillingCycleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dueDateInput = element(by.css('input#field_dueDate'));
    statementDateInput = element(by.css('input#field_statementDate'));
    notesInput = element(by.css('input#field_notes'));
    messageInput = element(by.css('input#field_message'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDueDateInput = function(dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function() {
        return this.dueDateInput.getAttribute('value');
    };

    setStatementDateInput = function(statementDate) {
        this.statementDateInput.sendKeys(statementDate);
    };

    getStatementDateInput = function() {
        return this.statementDateInput.getAttribute('value');
    };

    setNotesInput = function(notes) {
        this.notesInput.sendKeys(notes);
    };

    getNotesInput = function() {
        return this.notesInput.getAttribute('value');
    };

    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect
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
