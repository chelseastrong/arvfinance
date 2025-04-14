import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyModal extends LightningModal {
    @api content;
    @api recordId;

    get inputVariables() {
        return [
            { name: 'recordId', type: 'String', value: this.recordId }
        ];
    }

    //This handles the behavior after the flow is finished
    handleStatusChange(event){
        console.log('handleStatusChange', event.detail);
        if(event.detail.status === 'FINISHED') {
            //Close the modal
            this.close('FINISHED');
        }
    }

    handleClose() {
        this.close('done');
    }

    handleSave() {
    }
}