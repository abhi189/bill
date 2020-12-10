import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Discount e2e test', () => {
    let navBarPage: NavBarPage;
    let discountDialogPage: DiscountDialogPage;
    let discountComponentsPage: DiscountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Discounts', () => {
        navBarPage.goToEntity('discount');
        discountComponentsPage = new DiscountComponentsPage();
        expect(discountComponentsPage.getTitle()).toMatch(/billingWebApp.discount.home.title/);
    });

    it('should load create Discount dialog', () => {
        discountComponentsPage.clickOnCreateButton();
        discountDialogPage = new DiscountDialogPage();
        expect(discountDialogPage.getModalTitle()).toMatch(/billingWebApp.discount.home.createOrEditLabel/);
        discountDialogPage.close();
    });

    it('should create and save Discounts', () => {
        discountComponentsPage.clickOnCreateButton();
        discountDialogPage.setDiscountNameInput('discountName');
        expect(discountDialogPage.getDiscountNameInput()).toMatch('discountName');
        discountDialogPage.discountTypeSelectLastOption();
        discountDialogPage.setAssociatedEMOInput('associatedEMO');
        expect(discountDialogPage.getAssociatedEMOInput()).toMatch('associatedEMO');
        discountDialogPage.setDescriptionInput('description');
        expect(discountDialogPage.getDescriptionInput()).toMatch('description');
        discountDialogPage
            .getEquipmentInstalledRequiredInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    discountDialogPage.getEquipmentInstalledRequiredInput().click();
                    expect(discountDialogPage.getEquipmentInstalledRequiredInput().isSelected()).toBeFalsy();
                } else {
                    discountDialogPage.getEquipmentInstalledRequiredInput().click();
                    expect(discountDialogPage.getEquipmentInstalledRequiredInput().isSelected()).toBeTruthy();
                }
            });
        discountDialogPage.equipmentInstalledSelectLastOption();
        discountDialogPage
            .getEquipmentInstalledMonthsRequiredInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    discountDialogPage.getEquipmentInstalledMonthsRequiredInput().click();
                    expect(discountDialogPage.getEquipmentInstalledMonthsRequiredInput().isSelected()).toBeFalsy();
                } else {
                    discountDialogPage.getEquipmentInstalledMonthsRequiredInput().click();
                    expect(discountDialogPage.getEquipmentInstalledMonthsRequiredInput().isSelected()).toBeTruthy();
                }
            });
        discountDialogPage.setEquipmentInstalledMonthsInput('5');
        expect(discountDialogPage.getEquipmentInstalledMonthsInput()).toMatch('5');
        discountDialogPage
            .getAccrueDiscountSavingsInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    discountDialogPage.getAccrueDiscountSavingsInput().click();
                    expect(discountDialogPage.getAccrueDiscountSavingsInput().isSelected()).toBeFalsy();
                } else {
                    discountDialogPage.getAccrueDiscountSavingsInput().click();
                    expect(discountDialogPage.getAccrueDiscountSavingsInput().isSelected()).toBeTruthy();
                }
            });
        discountDialogPage.setStartDateInput('2000-12-31');
        expect(discountDialogPage.getStartDateInput()).toMatch('2000-12-31');
        discountDialogPage.setEndDateInput('2000-12-31');
        expect(discountDialogPage.getEndDateInput()).toMatch('2000-12-31');
        discountDialogPage.save();
        expect(discountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DiscountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-discount div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DiscountDialogPage {
    modalTitle = element(by.css('h4#myDiscountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    discountNameInput = element(by.css('input#field_discountName'));
    discountTypeSelect = element(by.css('select#field_discountType'));
    associatedEMOInput = element(by.css('input#field_associatedEMO'));
    descriptionInput = element(by.css('input#field_description'));
    equipmentInstalledRequiredInput = element(by.css('input#field_equipmentInstalledRequired'));
    equipmentInstalledSelect = element(by.css('select#field_equipmentInstalled'));
    equipmentInstalledMonthsRequiredInput = element(by.css('input#field_equipmentInstalledMonthsRequired'));
    equipmentInstalledMonthsInput = element(by.css('input#field_equipmentInstalledMonths'));
    accrueDiscountSavingsInput = element(by.css('input#field_accrueDiscountSavings'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDiscountNameInput = function(discountName) {
        this.discountNameInput.sendKeys(discountName);
    };

    getDiscountNameInput = function() {
        return this.discountNameInput.getAttribute('value');
    };

    setDiscountTypeSelect = function(discountType) {
        this.discountTypeSelect.sendKeys(discountType);
    };

    getDiscountTypeSelect = function() {
        return this.discountTypeSelect.element(by.css('option:checked')).getText();
    };

    discountTypeSelectLastOption = function() {
        this.discountTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setAssociatedEMOInput = function(associatedEMO) {
        this.associatedEMOInput.sendKeys(associatedEMO);
    };

    getAssociatedEMOInput = function() {
        return this.associatedEMOInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    getEquipmentInstalledRequiredInput = function() {
        return this.equipmentInstalledRequiredInput;
    };
    setEquipmentInstalledSelect = function(equipmentInstalled) {
        this.equipmentInstalledSelect.sendKeys(equipmentInstalled);
    };

    getEquipmentInstalledSelect = function() {
        return this.equipmentInstalledSelect.element(by.css('option:checked')).getText();
    };

    equipmentInstalledSelectLastOption = function() {
        this.equipmentInstalledSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    getEquipmentInstalledMonthsRequiredInput = function() {
        return this.equipmentInstalledMonthsRequiredInput;
    };
    setEquipmentInstalledMonthsInput = function(equipmentInstalledMonths) {
        this.equipmentInstalledMonthsInput.sendKeys(equipmentInstalledMonths);
    };

    getEquipmentInstalledMonthsInput = function() {
        return this.equipmentInstalledMonthsInput.getAttribute('value');
    };

    getAccrueDiscountSavingsInput = function() {
        return this.accrueDiscountSavingsInput;
    };
    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
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
