import { api, LightningElement, wire } from 'lwc';
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';


export default class DocChecklist extends LightningElement {
    @api recordId;

    checklists = [];
    

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
        console.log('parent handleStatusChange', event.detail);
    }
}