import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Utility e2e test', () => {
    let navBarPage: NavBarPage;
    let utilityDialogPage: UtilityDialogPage;
    let utilityComponentsPage: UtilityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Utilities', () => {
        navBarPage.goToEntity('utility');
        utilityComponentsPage = new UtilityComponentsPage();
        expect(utilityComponentsPage.getTitle()).toMatch(/billingWebApp.utility.home.title/);
    });

    it('should load create Utility dialog', () => {
        utilityComponentsPage.clickOnCreateButton();
        utilityDialogPage = new UtilityDialogPage();
        expect(utilityDialogPage.getModalTitle()).toMatch(/billingWebApp.utility.home.createOrEditLabel/);
        utilityDialogPage.close();
    });

    it('should create and save Utilities', () => {
        utilityComponentsPage.clickOnCreateButton();
        utilityDialogPage.setUtilityProviderKeyInput('utilityProviderKey');
        expect(utilityDialogPage.getUtilityProviderKeyInput()).toMatch('utilityProviderKey');
        utilityDialogPage.setNameInput('name');
        expect(utilityDialogPage.getNameInput()).toMatch('name');
        utilityDialogPage.setCountryInput('country');
        expect(utilityDialogPage.getCountryInput()).toMatch('country');
        utilityDialogPage.setStateInput('state');
        expect(utilityDialogPage.getStateInput()).toMatch('state');
        utilityDialogPage.save();
        expect(utilityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UtilityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UtilityDialogPage {
    modalTitle = element(by.css('h4#myUtilityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    utilityProviderKeyInput = element(by.css('input#field_utilityProviderKey'));
    nameInput = element(by.css('input#field_name'));
    countryInput = element(by.css('input#field_country'));
    stateInput = element(by.css('input#field_state'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUtilityProviderKeyInput = function(utilityProviderKey) {
        this.utilityProviderKeyInput.sendKeys(utilityProviderKey);
    };

    getUtilityProviderKeyInput = function() {
        return this.utilityProviderKeyInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    };

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
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
