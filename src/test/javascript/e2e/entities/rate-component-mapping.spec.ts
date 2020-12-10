import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RateComponentMapping e2e test', () => {
    let navBarPage: NavBarPage;
    let rateComponentMappingDialogPage: RateComponentMappingDialogPage;
    let rateComponentMappingComponentsPage: RateComponentMappingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RateComponentMappings', () => {
        navBarPage.goToEntity('rate-component-mapping');
        rateComponentMappingComponentsPage = new RateComponentMappingComponentsPage();
        expect(rateComponentMappingComponentsPage.getTitle()).toMatch(/billingWebApp.rateComponentMapping.home.title/);
    });

    it('should load create RateComponentMapping dialog', () => {
        rateComponentMappingComponentsPage.clickOnCreateButton();
        rateComponentMappingDialogPage = new RateComponentMappingDialogPage();
        expect(rateComponentMappingDialogPage.getModalTitle()).toMatch(/billingWebApp.rateComponentMapping.home.createOrEditLabel/);
        rateComponentMappingDialogPage.close();
    });

    it('should create and save RateComponentMappings', () => {
        rateComponentMappingComponentsPage.clickOnCreateButton();
        rateComponentMappingDialogPage.setBdRateComponentInput('bdRateComponent');
        expect(rateComponentMappingDialogPage.getBdRateComponentInput()).toMatch('bdRateComponent');
        rateComponentMappingDialogPage.setBdRateTypeInput('bdRateType');
        expect(rateComponentMappingDialogPage.getBdRateTypeInput()).toMatch('bdRateType');
        rateComponentMappingDialogPage.setChargeTypeInput('chargeType');
        expect(rateComponentMappingDialogPage.getChargeTypeInput()).toMatch('chargeType');
        rateComponentMappingDialogPage.setChargePeriodInput('chargePeriod');
        expect(rateComponentMappingDialogPage.getChargePeriodInput()).toMatch('chargePeriod');
        rateComponentMappingDialogPage.setTierInput('tier');
        expect(rateComponentMappingDialogPage.getTierInput()).toMatch('tier');
        rateComponentMappingDialogPage.setTouNameInput('touName');
        expect(rateComponentMappingDialogPage.getTouNameInput()).toMatch('touName');
        rateComponentMappingDialogPage.setTouTypeInput('touType');
        expect(rateComponentMappingDialogPage.getTouTypeInput()).toMatch('touType');
        rateComponentMappingDialogPage
            .getRateMappedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    rateComponentMappingDialogPage.getRateMappedInput().click();
                    expect(rateComponentMappingDialogPage.getRateMappedInput().isSelected()).toBeFalsy();
                } else {
                    rateComponentMappingDialogPage.getRateMappedInput().click();
                    expect(rateComponentMappingDialogPage.getRateMappedInput().isSelected()).toBeTruthy();
                }
            });
        rateComponentMappingDialogPage.providerSelectLastOption();
        rateComponentMappingDialogPage.save();
        expect(rateComponentMappingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RateComponentMappingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rate-component-mapping div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RateComponentMappingDialogPage {
    modalTitle = element(by.css('h4#myRateComponentMappingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bdRateComponentInput = element(by.css('input#field_bdRateComponent'));
    bdRateTypeInput = element(by.css('input#field_bdRateType'));
    chargeTypeInput = element(by.css('input#field_chargeType'));
    chargePeriodInput = element(by.css('input#field_chargePeriod'));
    tierInput = element(by.css('input#field_tier'));
    touNameInput = element(by.css('input#field_touName'));
    touTypeInput = element(by.css('input#field_touType'));
    rateMappedInput = element(by.css('input#field_rateMapped'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBdRateComponentInput = function(bdRateComponent) {
        this.bdRateComponentInput.sendKeys(bdRateComponent);
    };

    getBdRateComponentInput = function() {
        return this.bdRateComponentInput.getAttribute('value');
    };

    setBdRateTypeInput = function(bdRateType) {
        this.bdRateTypeInput.sendKeys(bdRateType);
    };

    getBdRateTypeInput = function() {
        return this.bdRateTypeInput.getAttribute('value');
    };

    setChargeTypeInput = function(chargeType) {
        this.chargeTypeInput.sendKeys(chargeType);
    };

    getChargeTypeInput = function() {
        return this.chargeTypeInput.getAttribute('value');
    };

    setChargePeriodInput = function(chargePeriod) {
        this.chargePeriodInput.sendKeys(chargePeriod);
    };

    getChargePeriodInput = function() {
        return this.chargePeriodInput.getAttribute('value');
    };

    setTierInput = function(tier) {
        this.tierInput.sendKeys(tier);
    };

    getTierInput = function() {
        return this.tierInput.getAttribute('value');
    };

    setTouNameInput = function(touName) {
        this.touNameInput.sendKeys(touName);
    };

    getTouNameInput = function() {
        return this.touNameInput.getAttribute('value');
    };

    setTouTypeInput = function(touType) {
        this.touTypeInput.sendKeys(touType);
    };

    getTouTypeInput = function() {
        return this.touTypeInput.getAttribute('value');
    };

    getRateMappedInput = function() {
        return this.rateMappedInput;
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
