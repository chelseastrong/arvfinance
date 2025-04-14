import { api, LightningElement, wire } from 'lwc';
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';
import saveChecklistRecords from '@salesforce/apex/DocumentChecklistController.saveChecklistRecords';
import myModal from 'c/docChecklistAddDocModal';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class DocChecklist extends LightningElement {
    @api recordId;
    checklists = [];
    _changed = {};
    wiredChecklistResult;
    

    @wire(getChecklistRecords, {opportunityId: '$recordId'})
    processGetChecklists(result) {
        this.wiredChecklistResult = result;

        if (result.data) {
            this.checklists = result.data;
            console.log('data',result.data);
        }
        if (result.error) {
            console.error(result.error);
        }
    }

    get pendingCount() {
        if (!this.checklists) {
            return 0;
        } else {
            return this.checklists.filter(checklist => checklist.Status__c === 'Pending').length;
        }
    }

    get pendingLabel() {
        return `Pending (${this.pendingCount})`;
    }

    async handleChecklistChange(event) {
        const Id = event.detail.Id;
        console.log('parent handleChecklistChange', Id);
        this._changed[Id] = {
            ...this._changed[Id],
            ...event.detail,
        };
        console.log('handleSave value: ', Object.values(this._changed));

        try {
            await this.handleSave(Object.values(this._changed)); //wait for save to complete
            await this.refreshChecklists(); //then refresh data
        } catch (error) {
            console.error('error');
        }
    }

    async handleSave(checklist) {
        console.log('handleSave', checklist);
        try {
            await saveChecklistRecords({documentChecklists: checklist})
        } catch (error) {
            console.error(error);
        }
    }

    async openModal() {
        const result = await myModal.open({
            size: 'small',
            description: 'Add Documents',
            content: 'Add Documents',
            recordId: this.recordId
        });
        console.log('Modal result', result);

        //Handle behvavior after modal closes
        if (result === 'FINISHED') {
            console.log('modal closed behavior');
            //Refresh checklist data
            await this.refreshChecklists();

            //Show success toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!',
                    message: 'Documents added to checklist', 
                    variant: 'success'})
            );
        }
    }

    refreshChecklists() {
        //Trigger the wire method to refresh data
        return refreshApex(this.wiredChecklistResult);
    }

}