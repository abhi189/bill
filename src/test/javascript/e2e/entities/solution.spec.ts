import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Solution e2e test', () => {
    let navBarPage: NavBarPage;
    let solutionDialogPage: SolutionDialogPage;
    let solutionComponentsPage: SolutionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Solutions', () => {
        navBarPage.goToEntity('solution');
        solutionComponentsPage = new SolutionComponentsPage();
        expect(solutionComponentsPage.getTitle()).toMatch(/billingWebApp.solution.home.title/);
    });

    it('should load create Solution dialog', () => {
        solutionComponentsPage.clickOnCreateButton();
        solutionDialogPage = new SolutionDialogPage();
        expect(solutionDialogPage.getModalTitle()).toMatch(/billingWebApp.solution.home.createOrEditLabel/);
        solutionDialogPage.close();
    });

    it('should create and save Solutions', () => {
        solutionComponentsPage.clickOnCreateButton();
        solutionDialogPage.setNameInput('name');
        expect(solutionDialogPage.getNameInput()).toMatch('name');
        solutionDialogPage.budderflyInvoiceSelectLastOption();
        solutionDialogPage.save();
        expect(solutionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SolutionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-solution div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SolutionDialogPage {
    modalTitle = element(by.css('h4#mySolutionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    budderflyInvoiceSelect = element(by.css('select#field_budderflyInvoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
