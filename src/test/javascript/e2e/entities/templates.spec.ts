import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Templates e2e test', () => {
    let navBarPage: NavBarPage;
    let templatesDialogPage: TemplatesDialogPage;
    let templatesComponentsPage: TemplatesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Templates', () => {
        navBarPage.goToEntity('templates');
        templatesComponentsPage = new TemplatesComponentsPage();
        expect(templatesComponentsPage.getTitle()).toMatch(/billingWebApp.templates.home.title/);
    });

    it('should load create Templates dialog', () => {
        templatesComponentsPage.clickOnCreateButton();
        templatesDialogPage = new TemplatesDialogPage();
        expect(templatesDialogPage.getModalTitle()).toMatch(/billingWebApp.templates.home.createOrEditLabel/);
        templatesDialogPage.close();
    });

    it('should create and save Templates', () => {
        templatesComponentsPage.clickOnCreateButton();
        templatesDialogPage.setCustomerTypeInput('customerType');
        expect(templatesDialogPage.getCustomerTypeInput()).toMatch('customerType');
        templatesDialogPage.templateTypeSelectLastOption();
        templatesDialogPage.setTemplateNameInput('templateName');
        expect(templatesDialogPage.getTemplateNameInput()).toMatch('templateName');
        templatesDialogPage.save();
        expect(templatesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TemplatesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-templates div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TemplatesDialogPage {
    modalTitle = element(by.css('h4#myTemplatesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    customerTypeInput = element(by.css('input#field_customerType'));
    templateTypeSelect = element(by.css('select#field_templateType'));
    templateNameInput = element(by.css('input#field_templateName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCustomerTypeInput = function(customerType) {
        this.customerTypeInput.sendKeys(customerType);
    };

    getCustomerTypeInput = function() {
        return this.customerTypeInput.getAttribute('value');
    };

    setTemplateTypeSelect = function(templateType) {
        this.templateTypeSelect.sendKeys(templateType);
    };

    getTemplateTypeSelect = function() {
        return this.templateTypeSelect.element(by.css('option:checked')).getText();
    };

    templateTypeSelectLastOption = function() {
        this.templateTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setTemplateNameInput = function(templateName) {
        this.templateNameInput.sendKeys(templateName);
    };

    getTemplateNameInput = function() {
        return this.templateNameInput.getAttribute('value');
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
