import { LightningElement, api, wire} from "lwc";
import getChecklistRecords from '@salesforce/apex/DocumentChecklistController.getChecklistRecords';
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import CHECKLIST_OBJECT from '@salesforce/schema/Document_Checklist__c';
import STATUS_OPTIONS from '@salesforce/schema/Document_Checklist__c.Status__c';



    // Columns for datatable
    const columns = [
        {
            label: 'File Name',
            fieldName: 'Name',
            type: 'text'
        },
        {
            label: 'Status',
            fieldName: 'Status__c',
            type: 'customPicklist',
            editable: true,
            typeAttributes: {   
                options : {fieldName : 'pickListOptions'},
                value : {fieldName : 'Status__c'},
                context: {fieldName : 'Id'}
            }
            
        }
    ];

export default class DocumentChecklist extends LightningElement {
    @api recordId;
    checklists = [];
    columns = columns;
    draftValues = [];
    checklistRefreshProp;
    statusOptions = [];

    @wire(getChecklistRecords, {
        opportunityId : '$recordId', 
        picklist : "$statusOptions"
    }) 
    wiredChecklists(result) {
        this.checklistRefreshProp = result;
        if (result.data) {
            console.log("Status options populated");
            this.checklists = result.data.map(currItem => {
                let pickListOptions = this.statusOptions;
                return {
                    ...currItem, 
                    pickListOptions: pickListOptions
                };
            });
            console.log('Fetched checklist records: ', result.data);
        } else if (result.error) {
            console.log('Error fetching checklist records: ', result.error);
        }
    }

    @wire(getObjectInfo,{
        objectAPIName: CHECKLIST_OBJECT
    }) 
    objectInfo;

    @wire(getPicklistValues,{
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldAPIName: STATUS_OPTIONS
    })
    wirePicklist({data,error}){
        if(data) { 
            this.statusOptions = data.values;
            console.log("this.statusOptions", this.statusOptions);
        }else if (error){
            console.log('Error getting picklist values: ', error);
        }
    }

    async handleSave(event) {
        const recordsToUpdate = event.detail.draftValues.map(draft => ({
            fields: { Id: draft.Id, Name: draft.Name, Status__c: draft.Status__c }
        }));

        const promises = recordsToUpdate.map(record => updateRecord(record));

        try {
            await Promise.all(promises);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];
            return refreshApex(this.wiredChecklist);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

}
