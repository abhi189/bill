import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TariffMappingRule e2e test', () => {
    let navBarPage: NavBarPage;
    let tariffMappingRuleDialogPage: TariffMappingRuleDialogPage;
    let tariffMappingRuleComponentsPage: TariffMappingRuleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TariffMappingRules', () => {
        navBarPage.goToEntity('tariff-mapping-rule');
        tariffMappingRuleComponentsPage = new TariffMappingRuleComponentsPage();
        expect(tariffMappingRuleComponentsPage.getTitle()).toMatch(/billingWebApp.tariffMappingRule.home.title/);
    });

    it('should load create TariffMappingRule dialog', () => {
        tariffMappingRuleComponentsPage.clickOnCreateButton();
        tariffMappingRuleDialogPage = new TariffMappingRuleDialogPage();
        expect(tariffMappingRuleDialogPage.getModalTitle()).toMatch(/billingWebApp.tariffMappingRule.home.createOrEditLabel/);
        tariffMappingRuleDialogPage.close();
    });

    it('should create and save TariffMappingRules', () => {
        tariffMappingRuleComponentsPage.clickOnCreateButton();
        tariffMappingRuleDialogPage.setBdTariffNameIdInput('5');
        expect(tariffMappingRuleDialogPage.getBdTariffNameIdInput()).toMatch('5');
        tariffMappingRuleDialogPage.setBdUtilityProviderKeyInput('bdUtilityProviderKey');
        expect(tariffMappingRuleDialogPage.getBdUtilityProviderKeyInput()).toMatch('bdUtilityProviderKey');
        tariffMappingRuleDialogPage.setProviderTariffCodeInput('providerTariffCode');
        expect(tariffMappingRuleDialogPage.getProviderTariffCodeInput()).toMatch('providerTariffCode');
        tariffMappingRuleDialogPage.setProviderTariffNameInput('providerTariffName');
        expect(tariffMappingRuleDialogPage.getProviderTariffNameInput()).toMatch('providerTariffName');
        tariffMappingRuleDialogPage.providerSelectLastOption();
        tariffMappingRuleDialogPage.save();
        expect(tariffMappingRuleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TariffMappingRuleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tariff-mapping-rule div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TariffMappingRuleDialogPage {
    modalTitle = element(by.css('h4#myTariffMappingRuleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bdTariffNameIdInput = element(by.css('input#field_bdTariffNameId'));
    bdUtilityProviderKeyInput = element(by.css('input#field_bdUtilityProviderKey'));
    providerTariffCodeInput = element(by.css('input#field_providerTariffCode'));
    providerTariffNameInput = element(by.css('input#field_providerTariffName'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBdTariffNameIdInput = function(bdTariffNameId) {
        this.bdTariffNameIdInput.sendKeys(bdTariffNameId);
    };

    getBdTariffNameIdInput = function() {
        return this.bdTariffNameIdInput.getAttribute('value');
    };

    setBdUtilityProviderKeyInput = function(bdUtilityProviderKey) {
        this.bdUtilityProviderKeyInput.sendKeys(bdUtilityProviderKey);
    };

    getBdUtilityProviderKeyInput = function() {
        return this.bdUtilityProviderKeyInput.getAttribute('value');
    };

    setProviderTariffCodeInput = function(providerTariffCode) {
        this.providerTariffCodeInput.sendKeys(providerTariffCode);
    };

    getProviderTariffCodeInput = function() {
        return this.providerTariffCodeInput.getAttribute('value');
    };

    setProviderTariffNameInput = function(providerTariffName) {
        this.providerTariffNameInput.sendKeys(providerTariffName);
    };

    getProviderTariffNameInput = function() {
        return this.providerTariffNameInput.getAttribute('value');
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
