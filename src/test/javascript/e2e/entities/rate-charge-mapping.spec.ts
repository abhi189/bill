import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RateChargeMapping e2e test', () => {
    let navBarPage: NavBarPage;
    let rateChargeMappingDialogPage: RateChargeMappingDialogPage;
    let rateChargeMappingComponentsPage: RateChargeMappingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RateChargeMappings', () => {
        navBarPage.goToEntity('rate-charge-mapping');
        rateChargeMappingComponentsPage = new RateChargeMappingComponentsPage();
        expect(rateChargeMappingComponentsPage.getTitle()).toMatch(/billingWebApp.rateChargeMapping.home.title/);
    });

    it('should load create RateChargeMapping dialog', () => {
        rateChargeMappingComponentsPage.clickOnCreateButton();
        rateChargeMappingDialogPage = new RateChargeMappingDialogPage();
        expect(rateChargeMappingDialogPage.getModalTitle()).toMatch(/billingWebApp.rateChargeMapping.home.createOrEditLabel/);
        rateChargeMappingDialogPage.close();
    });

    it('should create and save RateChargeMappings', () => {
        rateChargeMappingComponentsPage.clickOnCreateButton();
        rateChargeMappingDialogPage.setBdChargeIdInput('bdChargeId');
        expect(rateChargeMappingDialogPage.getBdChargeIdInput()).toMatch('bdChargeId');
        rateChargeMappingDialogPage.setBdChargeDescriptionInput('bdChargeDescription');
        expect(rateChargeMappingDialogPage.getBdChargeDescriptionInput()).toMatch('bdChargeDescription');
        rateChargeMappingDialogPage.setBdInvoiceSectionInput('bdInvoiceSection');
        expect(rateChargeMappingDialogPage.getBdInvoiceSectionInput()).toMatch('bdInvoiceSection');
        rateChargeMappingDialogPage.setRateNameInput('rateName');
        expect(rateChargeMappingDialogPage.getRateNameInput()).toMatch('rateName');
        rateChargeMappingDialogPage.setRateGroupNameInput('rateGroupName');
        expect(rateChargeMappingDialogPage.getRateGroupNameInput()).toMatch('rateGroupName');
        rateChargeMappingDialogPage.setChargeClassInput('chargeClass');
        expect(rateChargeMappingDialogPage.getChargeClassInput()).toMatch('chargeClass');
        rateChargeMappingDialogPage.setSeasonNameInput('seasonName');
        expect(rateChargeMappingDialogPage.getSeasonNameInput()).toMatch('seasonName');
        rateChargeMappingDialogPage.setApplicabilityValueInput('applicabilityValue');
        expect(rateChargeMappingDialogPage.getApplicabilityValueInput()).toMatch('applicabilityValue');
        rateChargeMappingDialogPage
            .getRateMappedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    rateChargeMappingDialogPage.getRateMappedInput().click();
                    expect(rateChargeMappingDialogPage.getRateMappedInput().isSelected()).toBeFalsy();
                } else {
                    rateChargeMappingDialogPage.getRateMappedInput().click();
                    expect(rateChargeMappingDialogPage.getRateMappedInput().isSelected()).toBeTruthy();
                }
            });
        rateChargeMappingDialogPage
            .getIgnoreExportInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    rateChargeMappingDialogPage.getIgnoreExportInput().click();
                    expect(rateChargeMappingDialogPage.getIgnoreExportInput().isSelected()).toBeFalsy();
                } else {
                    rateChargeMappingDialogPage.getIgnoreExportInput().click();
                    expect(rateChargeMappingDialogPage.getIgnoreExportInput().isSelected()).toBeTruthy();
                }
            });
        rateChargeMappingDialogPage
            .getForceOptionalInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    rateChargeMappingDialogPage.getForceOptionalInput().click();
                    expect(rateChargeMappingDialogPage.getForceOptionalInput().isSelected()).toBeFalsy();
                } else {
                    rateChargeMappingDialogPage.getForceOptionalInput().click();
                    expect(rateChargeMappingDialogPage.getForceOptionalInput().isSelected()).toBeTruthy();
                }
            });
        rateChargeMappingDialogPage.providerSelectLastOption();
        rateChargeMappingDialogPage.save();
        expect(rateChargeMappingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RateChargeMappingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rate-charge-mapping div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RateChargeMappingDialogPage {
    modalTitle = element(by.css('h4#myRateChargeMappingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bdChargeIdInput = element(by.css('input#field_bdChargeId'));
    bdChargeDescriptionInput = element(by.css('input#field_bdChargeDescription'));
    bdInvoiceSectionInput = element(by.css('input#field_bdInvoiceSection'));
    rateNameInput = element(by.css('input#field_rateName'));
    rateGroupNameInput = element(by.css('input#field_rateGroupName'));
    chargeClassInput = element(by.css('input#field_chargeClass'));
    seasonNameInput = element(by.css('input#field_seasonName'));
    applicabilityValueInput = element(by.css('input#field_applicabilityValue'));
    rateMappedInput = element(by.css('input#field_rateMapped'));
    ignoreExportInput = element(by.css('input#field_ignoreExport'));
    forceOptionalInput = element(by.css('input#field_forceOptional'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBdChargeIdInput = function(bdChargeId) {
        this.bdChargeIdInput.sendKeys(bdChargeId);
    };

    getBdChargeIdInput = function() {
        return this.bdChargeIdInput.getAttribute('value');
    };

    setBdChargeDescriptionInput = function(bdChargeDescription) {
        this.bdChargeDescriptionInput.sendKeys(bdChargeDescription);
    };

    getBdChargeDescriptionInput = function() {
        return this.bdChargeDescriptionInput.getAttribute('value');
    };

    setBdInvoiceSectionInput = function(bdInvoiceSection) {
        this.bdInvoiceSectionInput.sendKeys(bdInvoiceSection);
    };

    getBdInvoiceSectionInput = function() {
        return this.bdInvoiceSectionInput.getAttribute('value');
    };

    setRateNameInput = function(rateName) {
        this.rateNameInput.sendKeys(rateName);
    };

    getRateNameInput = function() {
        return this.rateNameInput.getAttribute('value');
    };

    setRateGroupNameInput = function(rateGroupName) {
        this.rateGroupNameInput.sendKeys(rateGroupName);
    };

    getRateGroupNameInput = function() {
        return this.rateGroupNameInput.getAttribute('value');
    };

    setChargeClassInput = function(chargeClass) {
        this.chargeClassInput.sendKeys(chargeClass);
    };

    getChargeClassInput = function() {
        return this.chargeClassInput.getAttribute('value');
    };

    setSeasonNameInput = function(seasonName) {
        this.seasonNameInput.sendKeys(seasonName);
    };

    getSeasonNameInput = function() {
        return this.seasonNameInput.getAttribute('value');
    };

    setApplicabilityValueInput = function(applicabilityValue) {
        this.applicabilityValueInput.sendKeys(applicabilityValue);
    };

    getApplicabilityValueInput = function() {
        return this.applicabilityValueInput.getAttribute('value');
    };

    getRateMappedInput = function() {
        return this.rateMappedInput;
    };
    getIgnoreExportInput = function() {
        return this.ignoreExportInput;
    };
    getForceOptionalInput = function() {
        return this.forceOptionalInput;
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
