import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UtilityMappingRule e2e test', () => {
    let navBarPage: NavBarPage;
    let utilityMappingRuleDialogPage: UtilityMappingRuleDialogPage;
    let utilityMappingRuleComponentsPage: UtilityMappingRuleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UtilityMappingRules', () => {
        navBarPage.goToEntity('utility-mapping-rule');
        utilityMappingRuleComponentsPage = new UtilityMappingRuleComponentsPage();
        expect(utilityMappingRuleComponentsPage.getTitle()).toMatch(/billingWebApp.utilityMappingRule.home.title/);
    });

    it('should load create UtilityMappingRule dialog', () => {
        utilityMappingRuleComponentsPage.clickOnCreateButton();
        utilityMappingRuleDialogPage = new UtilityMappingRuleDialogPage();
        expect(utilityMappingRuleDialogPage.getModalTitle()).toMatch(/billingWebApp.utilityMappingRule.home.createOrEditLabel/);
        utilityMappingRuleDialogPage.close();
    });

    it('should create and save UtilityMappingRules', () => {
        utilityMappingRuleComponentsPage.clickOnCreateButton();
        utilityMappingRuleDialogPage.setBdUtilityProviderKeyInput('bdUtilityProviderKey');
        expect(utilityMappingRuleDialogPage.getBdUtilityProviderKeyInput()).toMatch('bdUtilityProviderKey');
        utilityMappingRuleDialogPage.setProviderUtilityNameInput('providerUtilityName');
        expect(utilityMappingRuleDialogPage.getProviderUtilityNameInput()).toMatch('providerUtilityName');
        utilityMappingRuleDialogPage.setProviderStateInput('providerState');
        expect(utilityMappingRuleDialogPage.getProviderStateInput()).toMatch('providerState');
        utilityMappingRuleDialogPage.setProviderCountryInput('providerCountry');
        expect(utilityMappingRuleDialogPage.getProviderCountryInput()).toMatch('providerCountry');
        utilityMappingRuleDialogPage.providerSelectLastOption();
        utilityMappingRuleDialogPage.save();
        expect(utilityMappingRuleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UtilityMappingRuleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-utility-mapping-rule div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UtilityMappingRuleDialogPage {
    modalTitle = element(by.css('h4#myUtilityMappingRuleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bdUtilityProviderKeyInput = element(by.css('input#field_bdUtilityProviderKey'));
    providerUtilityNameInput = element(by.css('input#field_providerUtilityName'));
    providerStateInput = element(by.css('input#field_providerState'));
    providerCountryInput = element(by.css('input#field_providerCountry'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBdUtilityProviderKeyInput = function(bdUtilityProviderKey) {
        this.bdUtilityProviderKeyInput.sendKeys(bdUtilityProviderKey);
    };

    getBdUtilityProviderKeyInput = function() {
        return this.bdUtilityProviderKeyInput.getAttribute('value');
    };

    setProviderUtilityNameInput = function(providerUtilityName) {
        this.providerUtilityNameInput.sendKeys(providerUtilityName);
    };

    getProviderUtilityNameInput = function() {
        return this.providerUtilityNameInput.getAttribute('value');
    };

    setProviderStateInput = function(providerState) {
        this.providerStateInput.sendKeys(providerState);
    };

    getProviderStateInput = function() {
        return this.providerStateInput.getAttribute('value');
    };

    setProviderCountryInput = function(providerCountry) {
        this.providerCountryInput.sendKeys(providerCountry);
    };

    getProviderCountryInput = function() {
        return this.providerCountryInput.getAttribute('value');
    };

    providerSelectLastOption = function() {
        this.providerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    providerSelectOption = function(option) {
        this.providerSelect.sendKeys(option);
    };

    getProviderSelect = function() {
        return this.providerSelect;
    };

    getProviderSelectedOption = function() {
        return this.providerSelect.element(by.css('option:checked')).getText();
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
