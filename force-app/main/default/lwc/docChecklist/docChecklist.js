import { api, LightningElement, wire } from 'lwc';
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';

export default class DocChecklist extends LightningElement {
    @api recordId;

    checklists = [];

    @wire(getChecklistRecords, {opportunityId: '$recordId'})
    processGetChecklists({error, data}) {
        if (data) {
        this.checklists = data;
            console.log('data',data);
        }
        if (error) {
            console.error(error);
        }
    }



    statusOptions = [
        {
            label: 'Pending',
            value: 'Pending'
        },
        {
            label: 'Accepted',
            value: 'Accepted'
        },
        {
            label: 'Rejected',
            value: 'Rejected'
        }
    ];
}