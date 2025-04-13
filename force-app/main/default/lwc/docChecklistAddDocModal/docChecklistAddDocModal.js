import { api } from 'lwc';
import { LightningModal } from 'lightning/modal';

export default class DocChecklistAddDocModal extends LightningModal {
    @api oppty;

    connectedCallBack() {
        console.log('Modal Component');
    }
}