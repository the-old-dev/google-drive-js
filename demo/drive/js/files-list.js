import { html, LitElement } from "lit-element";
import { WueList, WueRadiobutton} from "web-ui-elements";

export class FilesList extends WueList {

    constructor() {
        super();
        this._registerFilesFoundListener();
    }

    renderElement(elementData) {
        return html`
            <wue-radiobutton name="${this.name}" title="${elementData.name}" value="${elementData.id}" @change="${this._handleChange}">Test</wue-radiobutton>
        `;
    }

    getFile(fileId) {
        var found = null;
        this.elements.forEach(element => {
            if (element.id == fileId) {
                found = element;
            }
        });
        return found;
    }

    _handleChange(event) {
        this.value = event.target.value;
    }

    _registerFilesFoundListener() {
        var myself = this;
        var callback = function(event) {
            myself._hanldeFilesFound(event);
        }
        document.addEventListener("filesfound", callback);
    }
    
    _hanldeFilesFound(event) {
        this.elements = event.detail.files;
    }
}

customElements.define('files-list', FilesList);