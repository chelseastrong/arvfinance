import { api, LightningElement, wire } from 'lwc';
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';


export default class DocChecklist extends LightningElement {
    @api recordId;

    checklists = [];

    _changed = [];
    

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

    handleStatusChange(event) {
        const index =  this._changed.findIndex(item => item.Id === event.detail.Id);
        if (index === -1) {
            this._changed.push(event.detail);
        } else {
            this._changed[index] = {
                ...this._changed[index],
                ...event.detail
            }
        }
        console.log(this._changed);
    }
}