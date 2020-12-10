import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('WorkOrder e2e test', () => {
    let navBarPage: NavBarPage;
    let workOrderDialogPage: WorkOrderDialogPage;
    let workOrderComponentsPage: WorkOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WorkOrders', () => {
        navBarPage.goToEntity('work-order');
        workOrderComponentsPage = new WorkOrderComponentsPage();
        expect(workOrderComponentsPage.getTitle()).toMatch(/billingWebApp.workOrder.home.title/);
    });

    it('should load create WorkOrder dialog', () => {
        workOrderComponentsPage.clickOnCreateButton();
        workOrderDialogPage = new WorkOrderDialogPage();
        expect(workOrderDialogPage.getModalTitle()).toMatch(/billingWebApp.workOrder.home.createOrEditLabel/);
        workOrderDialogPage.close();
    });

    it('should create and save WorkOrders', () => {
        workOrderComponentsPage.clickOnCreateButton();
        workOrderDialogPage.setWorkOrderNumberInput('5');
        expect(workOrderDialogPage.getWorkOrderNumberInput()).toMatch('5');
        workOrderDialogPage.setStatusInput('status');
        expect(workOrderDialogPage.getStatusInput()).toMatch('status');
        workOrderDialogPage.setScheduledDateAndTimeInput(12310020012301);
        expect(workOrderDialogPage.getScheduledDateAndTimeInput()).toMatch('2001-12-31T02:30');
        workOrderDialogPage.setNumberOfDaysToCompleteInput('5');
        expect(workOrderDialogPage.getNumberOfDaysToCompleteInput()).toMatch('5');
        workOrderDialogPage.setEstimatedCompletionDateInput('2000-12-31');
        expect(workOrderDialogPage.getEstimatedCompletionDateInput()).toMatch('2000-12-31');
        workOrderDialogPage.setTaskStatusLinkInput('taskStatusLink');
        expect(workOrderDialogPage.getTaskStatusLinkInput()).toMatch('taskStatusLink');
        workOrderDialogPage.setJhiLabelInput('jhiLabel');
        expect(workOrderDialogPage.getJhiLabelInput()).toMatch('jhiLabel');
        workOrderDialogPage.setSugarCrmReferenceInput('sugarCrmReference');
        expect(workOrderDialogPage.getSugarCrmReferenceInput()).toMatch('sugarCrmReference');
        workOrderDialogPage
            .getOverrideScheduledDateCheckInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    workOrderDialogPage.getOverrideScheduledDateCheckInput().click();
                    expect(workOrderDialogPage.getOverrideScheduledDateCheckInput().isSelected()).toBeFalsy();
                } else {
                    workOrderDialogPage.getOverrideScheduledDateCheckInput().click();
                    expect(workOrderDialogPage.getOverrideScheduledDateCheckInput().isSelected()).toBeTruthy();
                }
            });
        workOrderDialogPage.setSupportContactNameInput('supportContactName');
        expect(workOrderDialogPage.getSupportContactNameInput()).toMatch('supportContactName');
        workOrderDialogPage.setAdditionalContractorsInput('additionalContractors');
        expect(workOrderDialogPage.getAdditionalContractorsInput()).toMatch('additionalContractors');
        workOrderDialogPage.setCreationDateInput('2000-12-31');
        expect(workOrderDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        workOrderDialogPage.setContractorEmailInput('contractorEmail');
        expect(workOrderDialogPage.getContractorEmailInput()).toMatch('contractorEmail');
        workOrderDialogPage.setJhiUserInput('jhiUser');
        expect(workOrderDialogPage.getJhiUserInput()).toMatch('jhiUser');
        workOrderDialogPage.setWorkOrderLinkInput('workOrderLink');
        expect(workOrderDialogPage.getWorkOrderLinkInput()).toMatch('workOrderLink');
        workOrderDialogPage.setDueDateInput('2000-12-31');
        expect(workOrderDialogPage.getDueDateInput()).toMatch('2000-12-31');
        workOrderDialogPage.setNotificationEmailInput('notificationEmail');
        expect(workOrderDialogPage.getNotificationEmailInput()).toMatch('notificationEmail');
        workOrderDialogPage.setNetsuiteIdInput('netsuiteId');
        expect(workOrderDialogPage.getNetsuiteIdInput()).toMatch('netsuiteId');
        workOrderDialogPage.setAdditionalEmailsInput('additionalEmails');
        expect(workOrderDialogPage.getAdditionalEmailsInput()).toMatch('additionalEmails');
        workOrderDialogPage.setCoordinatorNameInput('coordinatorName');
        expect(workOrderDialogPage.getCoordinatorNameInput()).toMatch('coordinatorName');
        workOrderDialogPage.setJobRequestInput('jobRequest');
        expect(workOrderDialogPage.getJobRequestInput()).toMatch('jobRequest');
        workOrderDialogPage.setAssignedContractorInfoInput('assignedContractorInfo');
        expect(workOrderDialogPage.getAssignedContractorInfoInput()).toMatch('assignedContractorInfo');
        workOrderDialogPage.setReopenReasonInput('reopenReason');
        expect(workOrderDialogPage.getReopenReasonInput()).toMatch('reopenReason');
        workOrderDialogPage.setPrimaryTaskInput('primaryTask');
        expect(workOrderDialogPage.getPrimaryTaskInput()).toMatch('primaryTask');
        workOrderDialogPage.setSupportContactEmailInput('supportContactEmail');
        expect(workOrderDialogPage.getSupportContactEmailInput()).toMatch('supportContactEmail');
        workOrderDialogPage.setCompletionDateInput('2000-12-31');
        expect(workOrderDialogPage.getCompletionDateInput()).toMatch('2000-12-31');
        workOrderDialogPage.setCreatedDateInput(12310020012301);
        expect(workOrderDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        workOrderDialogPage.setLastModifiedDateInput(12310020012301);
        expect(workOrderDialogPage.getLastModifiedDateInput()).toMatch('2001-12-31T02:30');
        workOrderDialogPage.save();
        expect(workOrderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WorkOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-work-order div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WorkOrderDialogPage {
    modalTitle = element(by.css('h4#myWorkOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    workOrderNumberInput = element(by.css('input#field_workOrderNumber'));
    statusInput = element(by.css('input#field_status'));
    scheduledDateAndTimeInput = element(by.css('input#field_scheduledDateAndTime'));
    numberOfDaysToCompleteInput = element(by.css('input#field_numberOfDaysToComplete'));
    estimatedCompletionDateInput = element(by.css('input#field_estimatedCompletionDate'));
    taskStatusLinkInput = element(by.css('input#field_taskStatusLink'));
    jhiLabelInput = element(by.css('input#field_jhiLabel'));
    sugarCrmReferenceInput = element(by.css('input#field_sugarCrmReference'));
    overrideScheduledDateCheckInput = element(by.css('input#field_overrideScheduledDateCheck'));
    supportContactNameInput = element(by.css('input#field_supportContactName'));
    additionalContractorsInput = element(by.css('input#field_additionalContractors'));
    creationDateInput = element(by.css('input#field_creationDate'));
    contractorEmailInput = element(by.css('input#field_contractorEmail'));
    jhiUserInput = element(by.css('input#field_jhiUser'));
    workOrderLinkInput = element(by.css('input#field_workOrderLink'));
    dueDateInput = element(by.css('input#field_dueDate'));
    notificationEmailInput = element(by.css('input#field_notificationEmail'));
    netsuiteIdInput = element(by.css('input#field_netsuiteId'));
    additionalEmailsInput = element(by.css('input#field_additionalEmails'));
    coordinatorNameInput = element(by.css('input#field_coordinatorName'));
    jobRequestInput = element(by.css('input#field_jobRequest'));
    assignedContractorInfoInput = element(by.css('input#field_assignedContractorInfo'));
    reopenReasonInput = element(by.css('input#field_reopenReason'));
    primaryTaskInput = element(by.css('input#field_primaryTask'));
    supportContactEmailInput = element(by.css('input#field_supportContactEmail'));
    completionDateInput = element(by.css('input#field_completionDate'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifiedDateInput = element(by.css('input#field_lastModifiedDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWorkOrderNumberInput = function(workOrderNumber) {
        this.workOrderNumberInput.sendKeys(workOrderNumber);
    };

    getWorkOrderNumberInput = function() {
        return this.workOrderNumberInput.getAttribute('value');
    };

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    };

    setScheduledDateAndTimeInput = function(scheduledDateAndTime) {
        this.scheduledDateAndTimeInput.sendKeys(scheduledDateAndTime);
    };

    getScheduledDateAndTimeInput = function() {
        return this.scheduledDateAndTimeInput.getAttribute('value');
    };

    setNumberOfDaysToCompleteInput = function(numberOfDaysToComplete) {
        this.numberOfDaysToCompleteInput.sendKeys(numberOfDaysToComplete);
    };

    getNumberOfDaysToCompleteInput = function() {
        return this.numberOfDaysToCompleteInput.getAttribute('value');
    };

    setEstimatedCompletionDateInput = function(estimatedCompletionDate) {
        this.estimatedCompletionDateInput.sendKeys(estimatedCompletionDate);
    };

    getEstimatedCompletionDateInput = function() {
        return this.estimatedCompletionDateInput.getAttribute('value');
    };

    setTaskStatusLinkInput = function(taskStatusLink) {
        this.taskStatusLinkInput.sendKeys(taskStatusLink);
    };

    getTaskStatusLinkInput = function() {
        return this.taskStatusLinkInput.getAttribute('value');
    };

    setJhiLabelInput = function(jhiLabel) {
        this.jhiLabelInput.sendKeys(jhiLabel);
    };

    getJhiLabelInput = function() {
        return this.jhiLabelInput.getAttribute('value');
    };

    setSugarCrmReferenceInput = function(sugarCrmReference) {
        this.sugarCrmReferenceInput.sendKeys(sugarCrmReference);
    };

    getSugarCrmReferenceInput = function() {
        return this.sugarCrmReferenceInput.getAttribute('value');
    };

    getOverrideScheduledDateCheckInput = function() {
        return this.overrideScheduledDateCheckInput;
    };
    setSupportContactNameInput = function(supportContactName) {
        this.supportContactNameInput.sendKeys(supportContactName);
    };

    getSupportContactNameInput = function() {
        return this.supportContactNameInput.getAttribute('value');
    };

    setAdditionalContractorsInput = function(additionalContractors) {
        this.additionalContractorsInput.sendKeys(additionalContractors);
    };

    getAdditionalContractorsInput = function() {
        return this.additionalContractorsInput.getAttribute('value');
    };

    setCreationDateInput = function(creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    };

    getCreationDateInput = function() {
        return this.creationDateInput.getAttribute('value');
    };

    setContractorEmailInput = function(contractorEmail) {
        this.contractorEmailInput.sendKeys(contractorEmail);
    };

    getContractorEmailInput = function() {
        return this.contractorEmailInput.getAttribute('value');
    };

    setJhiUserInput = function(jhiUser) {
        this.jhiUserInput.sendKeys(jhiUser);
    };

    getJhiUserInput = function() {
        return this.jhiUserInput.getAttribute('value');
    };

    setWorkOrderLinkInput = function(workOrderLink) {
        this.workOrderLinkInput.sendKeys(workOrderLink);
    };

    getWorkOrderLinkInput = function() {
        return this.workOrderLinkInput.getAttribute('value');
    };

    setDueDateInput = function(dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function() {
        return this.dueDateInput.getAttribute('value');
    };

    setNotificationEmailInput = function(notificationEmail) {
        this.notificationEmailInput.sendKeys(notificationEmail);
    };

    getNotificationEmailInput = function() {
        return this.notificationEmailInput.getAttribute('value');
    };

    setNetsuiteIdInput = function(netsuiteId) {
        this.netsuiteIdInput.sendKeys(netsuiteId);
    };

    getNetsuiteIdInput = function() {
        return this.netsuiteIdInput.getAttribute('value');
    };

    setAdditionalEmailsInput = function(additionalEmails) {
        this.additionalEmailsInput.sendKeys(additionalEmails);
    };

    getAdditionalEmailsInput = function() {
        return this.additionalEmailsInput.getAttribute('value');
    };

    setCoordinatorNameInput = function(coordinatorName) {
        this.coordinatorNameInput.sendKeys(coordinatorName);
    };

    getCoordinatorNameInput = function() {
        return this.coordinatorNameInput.getAttribute('value');
    };

    setJobRequestInput = function(jobRequest) {
        this.jobRequestInput.sendKeys(jobRequest);
    };

    getJobRequestInput = function() {
        return this.jobRequestInput.getAttribute('value');
    };

    setAssignedContractorInfoInput = function(assignedContractorInfo) {
        this.assignedContractorInfoInput.sendKeys(assignedContractorInfo);
    };

    getAssignedContractorInfoInput = function() {
        return this.assignedContractorInfoInput.getAttribute('value');
    };

    setReopenReasonInput = function(reopenReason) {
        this.reopenReasonInput.sendKeys(reopenReason);
    };

    getReopenReasonInput = function() {
        return this.reopenReasonInput.getAttribute('value');
    };

    setPrimaryTaskInput = function(primaryTask) {
        this.primaryTaskInput.sendKeys(primaryTask);
    };

    getPrimaryTaskInput = function() {
        return this.primaryTaskInput.getAttribute('value');
    };

    setSupportContactEmailInput = function(supportContactEmail) {
        this.supportContactEmailInput.sendKeys(supportContactEmail);
    };

    getSupportContactEmailInput = function() {
        return this.supportContactEmailInput.getAttribute('value');
    };

    setCompletionDateInput = function(completionDate) {
        this.completionDateInput.sendKeys(completionDate);
    };

    getCompletionDateInput = function() {
        return this.completionDateInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setLastModifiedDateInput = function(lastModifiedDate) {
        this.lastModifiedDateInput.sendKeys(lastModifiedDate);
    };

    getLastModifiedDateInput = function() {
        return this.lastModifiedDateInput.getAttribute('value');
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
