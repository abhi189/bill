import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MissingInvoice e2e test', () => {
    let navBarPage: NavBarPage;
    let missingInvoiceDialogPage: MissingInvoiceDialogPage;
    let missingInvoiceComponentsPage: MissingInvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MissingInvoices', () => {
        navBarPage.goToEntity('missing-invoice');
        missingInvoiceComponentsPage = new MissingInvoiceComponentsPage();
        expect(missingInvoiceComponentsPage.getTitle()).toMatch(/billingWebApp.missingInvoice.home.title/);
    });

    it('should load create MissingInvoice dialog', () => {
        missingInvoiceComponentsPage.clickOnCreateButton();
        missingInvoiceDialogPage = new MissingInvoiceDialogPage();
        expect(missingInvoiceDialogPage.getModalTitle()).toMatch(/billingWebApp.missingInvoice.home.createOrEditLabel/);
        missingInvoiceDialogPage.close();
    });

    it('should create and save MissingInvoices', () => {
        missingInvoiceComponentsPage.clickOnCreateButton();
        missingInvoiceDialogPage.setBudderflyIdInput('budderflyId');
        expect(missingInvoiceDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        missingInvoiceDialogPage.setUtilityProviderInput('utilityProvider');
        expect(missingInvoiceDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        missingInvoiceDialogPage.setAccountNumberInput('accountNumber');
        expect(missingInvoiceDialogPage.getAccountNumberInput()).toMatch('accountNumber');
        missingInvoiceDialogPage.setTakeOverDateInput(12310020012301);
        expect(missingInvoiceDialogPage.getTakeOverDateInput()).toMatch('2001-12-31T02:30');
        missingInvoiceDialogPage.setStartDateInput(12310020012301);
        expect(missingInvoiceDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        missingInvoiceDialogPage.setEndDateInput(12310020012301);
        expect(missingInvoiceDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        missingInvoiceDialogPage
            .getGapFixedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    missingInvoiceDialogPage.getGapFixedInput().click();
                    expect(missingInvoiceDialogPage.getGapFixedInput().isSelected()).toBeFalsy();
                } else {
                    missingInvoiceDialogPage.getGapFixedInput().click();
                    expect(missingInvoiceDialogPage.getGapFixedInput().isSelected()).toBeTruthy();
                }
            });
        missingInvoiceDialogPage
            .getUploadedToUrjanetInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    missingInvoiceDialogPage.getUploadedToUrjanetInput().click();
                    expect(missingInvoiceDialogPage.getUploadedToUrjanetInput().isSelected()).toBeFalsy();
                } else {
                    missingInvoiceDialogPage.getUploadedToUrjanetInput().click();
                    expect(missingInvoiceDialogPage.getUploadedToUrjanetInput().isSelected()).toBeTruthy();
                }
            });
        missingInvoiceDialogPage.responsibleSelectLastOption();
        missingInvoiceDialogPage
            .getNoInvoicesInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    missingInvoiceDialogPage.getNoInvoicesInput().click();
                    expect(missingInvoiceDialogPage.getNoInvoicesInput().isSelected()).toBeFalsy();
                } else {
                    missingInvoiceDialogPage.getNoInvoicesInput().click();
                    expect(missingInvoiceDialogPage.getNoInvoicesInput().isSelected()).toBeTruthy();
                }
            });
        missingInvoiceDialogPage.setNotesInput('notes');
        expect(missingInvoiceDialogPage.getNotesInput()).toMatch('notes');
        missingInvoiceDialogPage.siteAccountSelectLastOption();
        missingInvoiceDialogPage.save();
        expect(missingInvoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MissingInvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-missing-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MissingInvoiceDialogPage {
    modalTitle = element(by.css('h4#myMissingInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    accountNumberInput = element(by.css('input#field_accountNumber'));
    takeOverDateInput = element(by.css('input#field_takeOverDate'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    gapFixedInput = element(by.css('input#field_gapFixed'));
    uploadedToUrjanetInput = element(by.css('input#field_uploadedToUrjanet'));
    responsibleSelect = element(by.css('select#field_responsible'));
    noInvoicesInput = element(by.css('input#field_noInvoices'));
    notesInput = element(by.css('input#field_notes'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    setUtilityProviderInput = function(utilityProvider) {
        this.utilityProviderInput.sendKeys(utilityProvider);
    };

    getUtilityProviderInput = function() {
        return this.utilityProviderInput.getAttribute('value');
    };

    setAccountNumberInput = function(accountNumber) {
        this.accountNumberInput.sendKeys(accountNumber);
    };

    getAccountNumberInput = function() {
        return this.accountNumberInput.getAttribute('value');
    };

    setTakeOverDateInput = function(takeOverDate) {
        this.takeOverDateInput.sendKeys(takeOverDate);
    };

    getTakeOverDateInput = function() {
        return this.takeOverDateInput.getAttribute('value');
    };

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    getGapFixedInput = function() {
        return this.gapFixedInput;
    };
    getUploadedToUrjanetInput = function() {
        return this.uploadedToUrjanetInput;
    };
    setResponsibleSelect = function(responsible) {
        this.responsibleSelect.sendKeys(responsible);
    };

    getResponsibleSelect = function() {
        return this.responsibleSelect.element(by.css('option:checked')).getText();
    };

    responsibleSelectLastOption = function() {
        this.responsibleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    getNoInvoicesInput = function() {
        return this.noInvoicesInput;
    };
    setNotesInput = function(notes) {
        this.notesInput.sendKeys(notes);
    };

    getNotesInput = function() {
        return this.notesInput.getAttribute('value');
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
