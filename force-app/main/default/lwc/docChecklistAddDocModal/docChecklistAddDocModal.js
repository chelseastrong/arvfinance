import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyModal extends LightningModal {
    @api content;
    @track inputVariables = [];

    get inputVariables() {
        return [
            { name: 'recordId', type: 'String', value: '' }
        ];
    }

    handleClose() {
        this.close('done');
    }

    handleSave() {
    }
}