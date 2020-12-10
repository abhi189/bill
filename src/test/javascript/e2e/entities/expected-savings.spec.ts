import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ExpectedSavings e2e test', () => {
    let navBarPage: NavBarPage;
    let expectedSavingsDialogPage: ExpectedSavingsDialogPage;
    let expectedSavingsComponentsPage: ExpectedSavingsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ExpectedSavings', () => {
        navBarPage.goToEntity('expected-savings');
        expectedSavingsComponentsPage = new ExpectedSavingsComponentsPage();
        expect(expectedSavingsComponentsPage.getTitle()).toMatch(/billingWebApp.expectedSavings.home.title/);
    });

    it('should load create ExpectedSavings dialog', () => {
        expectedSavingsComponentsPage.clickOnCreateButton();
        expectedSavingsDialogPage = new ExpectedSavingsDialogPage();
        expect(expectedSavingsDialogPage.getModalTitle()).toMatch(/billingWebApp.expectedSavings.home.createOrEditLabel/);
        expectedSavingsDialogPage.close();
    });

    it('should create and save ExpectedSavings', () => {
        expectedSavingsComponentsPage.clickOnCreateButton();
        expectedSavingsDialogPage.setCustomerTypeInput('customerType');
        expect(expectedSavingsDialogPage.getCustomerTypeInput()).toMatch('customerType');
        expectedSavingsDialogPage.setSolutionInput('solution');
        expect(expectedSavingsDialogPage.getSolutionInput()).toMatch('solution');
        expectedSavingsDialogPage.setSavingPercentageInput('5');
        expect(expectedSavingsDialogPage.getSavingPercentageInput()).toMatch('5');
        expectedSavingsDialogPage.save();
        expect(expectedSavingsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ExpectedSavingsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-expected-savings div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ExpectedSavingsDialogPage {
    modalTitle = element(by.css('h4#myExpectedSavingsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    customerTypeInput = element(by.css('input#field_customerType'));
    solutionInput = element(by.css('input#field_solution'));
    savingPercentageInput = element(by.css('input#field_savingPercentage'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCustomerTypeInput = function(customerType) {
        this.customerTypeInput.sendKeys(customerType);
    };

    getCustomerTypeInput = function() {
        return this.customerTypeInput.getAttribute('value');
    };

    setSolutionInput = function(solution) {
        this.solutionInput.sendKeys(solution);
    };

    getSolutionInput = function() {
        return this.solutionInput.getAttribute('value');
    };

    setSavingPercentageInput = function(savingPercentage) {
        this.savingPercentageInput.sendKeys(savingPercentage);
    };

    getSavingPercentageInput = function() {
        return this.savingPercentageInput.getAttribute('value');
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
