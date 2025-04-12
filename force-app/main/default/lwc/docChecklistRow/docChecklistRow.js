import { api, wire, LightningElement } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Document_Checklist__c.Status__c';

export default class DocChecklistRow extends LightningElement {
    @api checklist;

    statusOptions = [];

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: STATUS_FIELD })
    processGetPicklistValues({error, data}) {
        if (data) {
            console.log('data',data);
            this.statusOptions = data.values.map((statusPicklistValue) => {
                return { label: statusPicklistValue.label, value: statusPicklistValue.value};
            });
        }
        if (error) {
            console.error(error);
        }
    }

    handleStatusChange(event) {
        this.dispatchEvent(
            new CustomEvent('statuschange', {
                detail: {
                    Id: this.checklist.Id,
                    Status__c: event.detail.value
                }
            })
        )
        console.log('handleStatusChange', event.detail.value);
        //this.checklist.Id = event.detail.value;
    }
}