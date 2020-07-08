import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { DriveFilesUpdateRequest } from "/index.js";
import { DriveFilesMetadata } from "/index.js"

class UpdateForm extends AbstractDriveForm {

    constructor() {
        super("autorenew", "update");
    }

    get inputs() {
        return html`
            <wue-text-input name="fileId" title="File-ID" slot="inputs" value="" size="48"></wue-text-input>
            <wue-text-input name="mimeType" title="Mimetype" slot="inputs" value="" size="48"></wue-text-input>
            <wue-text-input name="content" title="Content" slot="inputs" value="" size="48"></wue-text-input>
        `;
    }

    checkInputs(inputs, errorDisplay) {
        if (inputs.fileId == null || inputs.fileId == "") {
            errorDisplay("Field-ID must not be null!");
            return false;
        } else if (inputs.mimeType == null || inputs.mimeType == "") {
            errorDisplay("Mimetype must not be null!");
            return false;
        } else {
            return true;
        }
    }

    createRequest(inputs, successCallback, errorCallback) {
        var content = JSON.parse(inputs.content);
        return new DriveFilesUpdateRequest(inputs.fileId, inputs.mimeType, content, successCallback, errorCallback);
    }

    hanldeFileSelected(file) {
        
        var mimeType = this.getElementByName("mimeType");
        var fileId = this.getElementByName("fileId");

        if (file.mimeType == DriveFilesMetadata.MIME_TYPES.FOLDER) {
            fileId.value = "";
            mimeType.value = "";
        } else {
            fileId.value = file.id;
            mimeType.value = file.mimeType;
        }

    }

}

customElements.define('update-form', UpdateForm);