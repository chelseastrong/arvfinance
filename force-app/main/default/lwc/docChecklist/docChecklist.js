import { LightningElement } from 'lwc';

export default class DocChecklist extends LightningElement {
    checklists = [
        {
            Id: "0",
            Name: "Purchase Agreement",
            Status__c: "Pending",
          },
        {
            Id: "1",
            Name: "Construction Budget",
            Status__c: "Accepted",
        }
    ];

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