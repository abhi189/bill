import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RateUsageTypeMapping e2e test', () => {
    let navBarPage: NavBarPage;
    let rateUsageTypeMappingDialogPage: RateUsageTypeMappingDialogPage;
    let rateUsageTypeMappingComponentsPage: RateUsageTypeMappingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RateUsageTypeMappings', () => {
        navBarPage.goToEntity('rate-usage-type-mapping');
        rateUsageTypeMappingComponentsPage = new RateUsageTypeMappingComponentsPage();
        expect(rateUsageTypeMappingComponentsPage.getTitle()).toMatch(/billingWebApp.rateUsageTypeMapping.home.title/);
    });

    it('should load create RateUsageTypeMapping dialog', () => {
        rateUsageTypeMappingComponentsPage.clickOnCreateButton();
        rateUsageTypeMappingDialogPage = new RateUsageTypeMappingDialogPage();
        expect(rateUsageTypeMappingDialogPage.getModalTitle()).toMatch(/billingWebApp.rateUsageTypeMapping.home.createOrEditLabel/);
        rateUsageTypeMappingDialogPage.close();
    });

    it('should create and save RateUsageTypeMappings', () => {
        rateUsageTypeMappingComponentsPage.clickOnCreateButton();
        rateUsageTypeMappingDialogPage.setBdUsageUnitInput('bdUsageUnit');
        expect(rateUsageTypeMappingDialogPage.getBdUsageUnitInput()).toMatch('bdUsageUnit');
        rateUsageTypeMappingDialogPage.setChargeTypeInput('chargeType');
        expect(rateUsageTypeMappingDialogPage.getChargeTypeInput()).toMatch('chargeType');
        rateUsageTypeMappingDialogPage.setServiceTypeInput('serviceType');
        expect(rateUsageTypeMappingDialogPage.getServiceTypeInput()).toMatch('serviceType');
        rateUsageTypeMappingDialogPage
            .getRateMappedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    rateUsageTypeMappingDialogPage.getRateMappedInput().click();
                    expect(rateUsageTypeMappingDialogPage.getRateMappedInput().isSelected()).toBeFalsy();
                } else {
                    rateUsageTypeMappingDialogPage.getRateMappedInput().click();
                    expect(rateUsageTypeMappingDialogPage.getRateMappedInput().isSelected()).toBeTruthy();
                }
            });
        rateUsageTypeMappingDialogPage.providerSelectLastOption();
        rateUsageTypeMappingDialogPage.save();
        expect(rateUsageTypeMappingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RateUsageTypeMappingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rate-usage-type-mapping div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RateUsageTypeMappingDialogPage {
    modalTitle = element(by.css('h4#myRateUsageTypeMappingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bdUsageUnitInput = element(by.css('input#field_bdUsageUnit'));
    chargeTypeInput = element(by.css('input#field_chargeType'));
    serviceTypeInput = element(by.css('input#field_serviceType'));
    rateMappedInput = element(by.css('input#field_rateMapped'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBdUsageUnitInput = function(bdUsageUnit) {
        this.bdUsageUnitInput.sendKeys(bdUsageUnit);
    };

    getBdUsageUnitInput = function() {
        return this.bdUsageUnitInput.getAttribute('value');
    };

    setChargeTypeInput = function(chargeType) {
        this.chargeTypeInput.sendKeys(chargeType);
    };

    getChargeTypeInput = function() {
        return this.chargeTypeInput.getAttribute('value');
    };

    setServiceTypeInput = function(serviceType) {
        this.serviceTypeInput.sendKeys(serviceType);
    };

    getServiceTypeInput = function() {
        return this.serviceTypeInput.getAttribute('value');
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
