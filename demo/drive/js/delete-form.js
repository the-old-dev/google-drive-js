import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { WueTextInput } from "web-ui-elements";
import { DriveFilesDeleteRequest } from "/index.js";

class DeleteForm extends AbstractDriveForm {

    constructor() {
        super("delete", "Delete");
    }
    
    checkInputs(inputs, errorDisplay) {
        if (inputs.fileId != null && inputs.fileId != "") {
            return true;
        } else {
            errorDisplay("File-ID must not be empty!");
            return false;
        }
    }

    createRequest(inputs, successCallback, errorCallback) {
        return new DriveFilesDeleteRequest(inputs.fileId, successCallback, errorCallback);
    }

    get inputs() {
        return html`
            <wue-text-input name="fileId" title="File-ID" slot="inputs" value="" size="48"></wue-text-input>
        `;
    }

}
customElements.define('delete-form', DeleteForm);
