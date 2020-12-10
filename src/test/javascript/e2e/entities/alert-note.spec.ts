import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AlertNote e2e test', () => {
    let navBarPage: NavBarPage;
    let alertNoteDialogPage: AlertNoteDialogPage;
    let alertNoteComponentsPage: AlertNoteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AlertNotes', () => {
        navBarPage.goToEntity('alert-note');
        alertNoteComponentsPage = new AlertNoteComponentsPage();
        expect(alertNoteComponentsPage.getTitle()).toMatch(/billingWebApp.alertNote.home.title/);
    });

    it('should load create AlertNote dialog', () => {
        alertNoteComponentsPage.clickOnCreateButton();
        alertNoteDialogPage = new AlertNoteDialogPage();
        expect(alertNoteDialogPage.getModalTitle()).toMatch(/billingWebApp.alertNote.home.createOrEditLabel/);
        alertNoteDialogPage.close();
    });

    it('should create and save AlertNotes', () => {
        alertNoteComponentsPage.clickOnCreateButton();
        alertNoteDialogPage.setDateInput(12310020012301);
        expect(alertNoteDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        alertNoteDialogPage.setNoteInput('note');
        expect(alertNoteDialogPage.getNoteInput()).toMatch('note');
        alertNoteDialogPage
            .getCustomerFacingInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    alertNoteDialogPage.getCustomerFacingInput().click();
                    expect(alertNoteDialogPage.getCustomerFacingInput().isSelected()).toBeFalsy();
                } else {
                    alertNoteDialogPage.getCustomerFacingInput().click();
                    expect(alertNoteDialogPage.getCustomerFacingInput().isSelected()).toBeTruthy();
                }
            });
        alertNoteDialogPage.alertNoteSelectLastOption();
        alertNoteDialogPage.save();
        expect(alertNoteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlertNoteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alert-note div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlertNoteDialogPage {
    modalTitle = element(by.css('h4#myAlertNoteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    noteInput = element(by.css('textarea#field_note'));
    customerFacingInput = element(by.css('input#field_customerFacing'));
    alertNoteSelect = element(by.css('select#field_alertNote'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    };

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
    };

    getCustomerFacingInput = function() {
        return this.customerFacingInput;
    };
    alertNoteSelectLastOption = function() {
        this.alertNoteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    alertNoteSelectOption = function(option) {
        this.alertNoteSelect.sendKeys(option);
    };

    getAlertNoteSelect = function() {
        return this.alertNoteSelect;
    };

    getAlertNoteSelectedOption = function() {
        return this.alertNoteSelect.element(by.css('option:checked')).getText();
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
