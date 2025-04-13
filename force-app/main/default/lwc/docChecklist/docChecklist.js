import { api, LightningElement, wire } from 'lwc';
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';
import saveChecklistRecords from '@salesforce/apex/DocumentChecklistController.saveChecklistRecords';


export default class DocChecklist extends LightningElement {
    @api recordId;

    checklists = [];

    _changed = {};
    

    @wire(getChecklistRecords, {opportunityId: '$recordId'})
    processGetChecklists({error, data}) {
        if (data) {
            console.log('data',data);
            this.checklists = data;
        }
        if (error) {
            console.error(error);
        }
    }

    handleChecklistChange(event) {
        const Id = event.detail.Id;
        console.log('parent handleChecklistChange', Id);
        this._changed[Id] = {
            ...this._changed[Id],
            ...event.detail,
        };
        console.log('handleSave value: ', Object.values(this._changed));
        this.handleSave(Object.values(this._changed));
    }

}