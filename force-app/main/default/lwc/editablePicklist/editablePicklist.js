import { LightningElement, api } from 'lwc';

export default class EditablePicklist extends LightningElement {
    @api value;
    @api options;

    handleChange(event) {
        const selectedEvent = new CustomEvent('change', {
            detail: {
                value: event.target.value
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(selectedEvent);
    }
}