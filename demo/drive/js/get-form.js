import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { DriveFilesGetRequest } from "/index.js";
import { DriveFilesMetadata } from "/index.js"

class GetForm extends AbstractDriveForm {

    constructor() {
        super("file-download", "Get");
    }

    get inputs() {
        return html`
            <wue-text-input name="fileId" title="File ID" slot="inputs" value="" size="48"></wue-text-input>
            <wue-checkbox name="metadataOnly" title="Only Metadata" slot="inputs"></wue-checkbox>
        `;
    }

    checkInputs(inputs, errorDisplay) {
        if (inputs.fileId == null || inputs.fileId == "") {
            errorDisplay("File ID must not be null!");
            return false;
        } else {
            return true;
        }
    }

    createRequest(inputs, successCallback, errorCallback) {
        return new DriveFilesGetRequest(inputs.fileId, inputs.metadataOnly, successCallback, errorCallback);
    }

    hanldeFileSelected(file) {
        super.hanldeFileSelected(file);
        var metadataOnly = this.getElementByName("metadataOnly");
        if ( file.mimeType == DriveFilesMetadata.MIME_TYPES.FOLDER ) {
            metadataOnly.value = true;
        } else {
            metadataOnly.value = false;
        }
    }
}

customElements.define('get-form', GetForm);