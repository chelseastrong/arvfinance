import { LightningElement } from 'lwc';
import LightningDatatable from 'lightning/datatable';
import CustomPicklist from "./customPicklist.html";  
import CustomPicklistEdit from "./customPicklistEdit.html";  

export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        customPicklist: {
            template: CustomPicklist, 
            editTemplate: CustomPicklistEdit,
            standardCellLayout: true,
            typeAttributes: ["options", "value", "context"]
        }
    };
}