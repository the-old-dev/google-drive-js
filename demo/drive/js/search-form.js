import { AbstractDriveForm } from "./abstract-drive-form";
import { html } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { DriveFilesListRequest } from "/index.js";
import { DriveFilesQuery } from "/index.js";

export class SearchForm extends AbstractDriveForm {

    constructor() {
        super("search", "Search");
    }

    get inputs() {
        return html`
            <wue-text-input name="parentId" title="Parent-ID" value="" size="48"></wue-text-input>
            <wue-checkbox slot="inputs" name="folder" title="Folder"></wue-checkbox>
            <wue-text-input slot="inputs" name="name" title="Name" value="" size="48"></wue-text-input>
        `;
    }

    createRequest(inputs, successCallback, errorCallback) {
        var myself = this;
        var successWrapper = function(result) {
            successCallback("(" + result.response.files.length + ") files found");
            var type = "filesfound";
            var detail = {files: result.response.files};       
            var event = new CustomEvent(type, { detail: detail, bubbles: true, composed: true } );
            myself.dispatchEvent(event);
        };
        var query = new DriveFilesQuery();
        if (inputs.parentId != null && inputs.parentId != "") {
            query.addHasParentId(inputs.parentId);
        }
        if (inputs.name != null && inputs.name != "") {
            query.andHasName(inputs.name);
        }
        if (inputs.folder) {
            query.andIsFolder();
        }
        return new DriveFilesListRequest(query, successWrapper, errorCallback);
    }

}

customElements.define('search-form', SearchForm);