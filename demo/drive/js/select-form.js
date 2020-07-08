import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { FilesList } from "./files-list";

class SelectForm extends AbstractDriveForm {

    constructor() {
        super("polymer", "Select");
    }
    
    checkInputs(inputs, errorDisplay) {

        if (inputs.filesList != null && inputs.filesList != "") {
            return true;
        } else {
            errorDisplay("Selection must not be empty!");
            return false;
        }
    }

    createRequest(inputs, successCallback, errorCallback) {

        successCallback("File is selected!");

        var type = "fileselected";
        var detail = {
            file: this.getFile(inputs.filesList)
        };       
        var event = new CustomEvent(type, { detail: detail, bubbles: true, composed: true } );
        this.dispatchEvent(event);
        return null;
    }

    getFile(fileId) {
        var filesList = this.shadowRoot.querySelector('[name="filesList"]');
        return filesList.getFile(fileId);
    }

    get inputs() {
        return html`
            <files-list name="filesList" slot="inputs"></files-list>
        `;
    }

}
customElements.define('select-form', SelectForm);
