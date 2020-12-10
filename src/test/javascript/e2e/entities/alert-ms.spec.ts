import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AlertMs e2e test', () => {
    let navBarPage: NavBarPage;
    let alertMsDialogPage: AlertMsDialogPage;
    let alertMsComponentsPage: AlertMsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AlertMs', () => {
        navBarPage.goToEntity('alert-ms');
        alertMsComponentsPage = new AlertMsComponentsPage();
        expect(alertMsComponentsPage.getTitle()).toMatch(/billingWebApp.alertMs.home.title/);
    });

    it('should load create AlertMs dialog', () => {
        alertMsComponentsPage.clickOnCreateButton();
        alertMsDialogPage = new AlertMsDialogPage();
        expect(alertMsDialogPage.getModalTitle()).toMatch(/billingWebApp.alertMs.home.createOrEditLabel/);
        alertMsDialogPage.close();
    });

    it('should create and save AlertMs', () => {
        alertMsComponentsPage.clickOnCreateButton();
        alertMsDialogPage.setAssigneeInput('assignee');
        expect(alertMsDialogPage.getAssigneeInput()).toMatch('assignee');
        alertMsDialogPage.alertTypeSelectLastOption();
        alertMsDialogPage.setBudderflyIdInput('budderflyId');
        expect(alertMsDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        alertMsDialogPage.setItemInput('item');
        expect(alertMsDialogPage.getItemInput()).toMatch('item');
        alertMsDialogPage.setDescriptionInput('description');
        expect(alertMsDialogPage.getDescriptionInput()).toMatch('description');
        alertMsDialogPage.sourceSelectLastOption();
        alertMsDialogPage.setAlertDateInput(12310020012301);
        expect(alertMsDialogPage.getAlertDateInput()).toMatch('2001-12-31T02:30');
        alertMsDialogPage.severitySelectLastOption();
        alertMsDialogPage.statusSelectLastOption();
        alertMsDialogPage.save();
        expect(alertMsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlertMsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alert-ms div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlertMsDialogPage {
    modalTitle = element(by.css('h4#myAlertMsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    assigneeInput = element(by.css('input#field_assignee'));
    alertTypeSelect = element(by.css('select#field_alertType'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    itemInput = element(by.css('input#field_item'));
    descriptionInput = element(by.css('input#field_description'));
    sourceSelect = element(by.css('select#field_source'));
    alertDateInput = element(by.css('input#field_alertDate'));
    severitySelect = element(by.css('select#field_severity'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAssigneeInput = function(assignee) {
        this.assigneeInput.sendKeys(assignee);
    };

    getAssigneeInput = function() {
        return this.assigneeInput.getAttribute('value');
    };

    setAlertTypeSelect = function(alertType) {
        this.alertTypeSelect.sendKeys(alertType);
    };

    getAlertTypeSelect = function() {
        return this.alertTypeSelect.element(by.css('option:checked')).getText();
    };

    alertTypeSelectLastOption = function() {
        this.alertTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    setItemInput = function(item) {
        this.itemInput.sendKeys(item);
    };

    getItemInput = function() {
        return this.itemInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setSourceSelect = function(source) {
        this.sourceSelect.sendKeys(source);
    };

    getSourceSelect = function() {
        return this.sourceSelect.element(by.css('option:checked')).getText();
    };

    sourceSelectLastOption = function() {
        this.sourceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setAlertDateInput = function(alertDate) {
        this.alertDateInput.sendKeys(alertDate);
    };

    getAlertDateInput = function() {
        return this.alertDateInput.getAttribute('value');
    };

    setSeveritySelect = function(severity) {
        this.severitySelect.sendKeys(severity);
    };

    getSeveritySelect = function() {
        return this.severitySelect.element(by.css('option:checked')).getText();
    };

    severitySelectLastOption = function() {
        this.severitySelect
            .all(by.tagName('option'))
            .last()
            .click();
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
