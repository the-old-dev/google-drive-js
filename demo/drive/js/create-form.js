import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { DriveFilesCreateRequest } from "/index.js";
import { DriveFilesMetadata } from "/index.js";

export class CreateForm extends AbstractDriveForm {

    constructor() {
        super("add-box", "Create");
    }

    get inputs() {
        return html`
            <wue-text-input name="parentId" title="Parent-ID" slot="inputs" value="" size="48"></wue-text-input>
            <wue-checkbox name="folder" title="Folder" slot="inputs"></wue-checkbox>
            <wue-text-input name="name" title="Name" slot="inputs" value="" size="48"></wue-text-input>
        `;
    }

    checkInputs(inputs, errorDisplay) {
        if (inputs.name == null || inputs.name =="") {
            errorDisplay("Name must be filled!");
            return false;
        } else {
            return true;
        }
    }

    createRequest(inputs, successCallback, errorCallback) {
        var metadata = new DriveFilesMetadata(inputs.name);     
        if (inputs.folder) {
            metadata.mimeType = DriveFilesMetadata.MIME_TYPES.FOLDER;
        }
        metadata.parent = inputs.parentId;
        return new DriveFilesCreateRequest(metadata, successCallback, errorCallback);
    }

    hanldeFileSelected(file) {
        var parentId = this.getElementByName("parentId");
        if ( file.mimeType == DriveFilesMetadata.MIME_TYPES.FOLDER ) {
            parentId.value = file.id;
        } else {
            parentId.value = "";
        }
    }
}

customElements.define('create-form', CreateForm);