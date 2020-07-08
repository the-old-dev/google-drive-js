import { WueBasicForm, WueTextInput, WueCheckbox } from "web-ui-elements";
import { OAuthContext } from "google-oauth-js";

export class AbstractDriveForm extends WueBasicForm {

    constructor(icon, title) {
        super();
        this.icon = icon;
        this.title = title;
        this.context = new OAuthContext();
        this.registerFileSelectionistener();
    }

    handleButtonClick(inputs, successDisplay, errorDisplay) {
        if (this.checkInputs(inputs, errorDisplay)) {
            var request = this.createRequest(inputs, successDisplay, errorDisplay);
            if (request != null) {
                request.execute(this.context);
            }
        }
    }

    createRequest(inputs, successCallback, errorCallback) {
        return null;
    }

    checkInputs(inputs, errorDisplay) {
        return true;
    }

    registerFileSelectionistener() {
        var myself = this;
        var callback = function (event) {
            myself.hanldeFileSelected(event.detail.file);
        }
        document.addEventListener("fileselected", callback);
    }

    hanldeFileSelected(file) {
        var fileId = this.getElementByName("fileId");
        if (fileId != null) {
            fileId.value = file.id;
        }
    }

    getElementByName(name) {
        return this.shadowRoot.querySelector('[name="' + name + '"]');
    }

}