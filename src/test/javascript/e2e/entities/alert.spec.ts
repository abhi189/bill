import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Alert e2e test', () => {
    let navBarPage: NavBarPage;
    let alertDialogPage: AlertDialogPage;
    let alertComponentsPage: AlertComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Alerts', () => {
        navBarPage.goToEntity('alert');
        alertComponentsPage = new AlertComponentsPage();
        expect(alertComponentsPage.getTitle()).toMatch(/billingWebApp.alert.home.title/);
    });

    it('should load create Alert dialog', () => {
        alertComponentsPage.clickOnCreateButton();
        alertDialogPage = new AlertDialogPage();
        expect(alertDialogPage.getModalTitle()).toMatch(/billingWebApp.alert.home.createOrEditLabel/);
        alertDialogPage.close();
    });

    it('should create and save Alerts', () => {
        alertComponentsPage.clickOnCreateButton();
        alertDialogPage.setDescriptionInput('description');
        expect(alertDialogPage.getDescriptionInput()).toMatch('description');
        alertDialogPage.prioritySelectLastOption();
        alertDialogPage.categorySelectLastOption();
        alertDialogPage.setAssignedToInput('assignedTo');
        expect(alertDialogPage.getAssignedToInput()).toMatch('assignedTo');
        alertDialogPage.setCreatedDateInput(12310020012301);
        expect(alertDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        alertDialogPage.setLastModifiedInput(12310020012301);
        expect(alertDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        alertDialogPage.siteAccountSelectLastOption();
        alertDialogPage.save();
        expect(alertDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlertComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alert div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlertDialogPage {
    modalTitle = element(by.css('h4#myAlertLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    prioritySelect = element(by.css('select#field_priority'));
    categorySelect = element(by.css('select#field_category'));
    assignedToInput = element(by.css('input#field_assignedTo'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setPrioritySelect = function(priority) {
        this.prioritySelect.sendKeys(priority);
    };

    getPrioritySelect = function() {
        return this.prioritySelect.element(by.css('option:checked')).getText();
    };

    prioritySelectLastOption = function() {
        this.prioritySelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setCategorySelect = function(category) {
        this.categorySelect.sendKeys(category);
    };

    getCategorySelect = function() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    };

    categorySelectLastOption = function() {
        this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setAssignedToInput = function(assignedTo) {
        this.assignedToInput.sendKeys(assignedTo);
    };

    getAssignedToInput = function() {
        return this.assignedToInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setLastModifiedInput = function(lastModified) {
        this.lastModifiedInput.sendKeys(lastModified);
    };

    getLastModifiedInput = function() {
        return this.lastModifiedInput.getAttribute('value');
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
