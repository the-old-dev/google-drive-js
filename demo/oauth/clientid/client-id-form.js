import { html, LitElement } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { AbstractOAuthForm } from "../js/abstract-oauth-form";
import { OAuthContext } from "../index.js";

export class ClientIdForm extends AbstractOAuthForm {

    constructor() {
        super("verified-user", "Change");
        this.context = new OAuthContext();
    }

    get inputs() {
        return html`
            <!-- Inputs -->
            <div slot="inputs">
                    For Google Client-ID 
                    <a title="Open in a new Window" 
                       href="https://console.developers.google.com/apis/credentials" 
                       target="_blank">Open Google Developers Console</a>
            </div>
            <wue-text-input slot="inputs" 
                name="clientId" title="Client-ID" value="${this.context.clientId}" size="48"></wue-text-input>

        `;
    }

    handleButtonClick(inputs, successDisplay, errorDisplay) {
        var newClientId = inputs.clientId;
        var clientId = this.context.clientId;
        var confirmed = confirm("Change the client id?\n" + clientId + "\n to \n" + newClientId);
        if (confirmed == true) {
            this.context.clientId = newClientId;
            successDisplay("Change done!");
        } else {
            errorDisplay("Change cancelled!");
        }
    }

}

customElements.define("client-id-form", ClientIdForm);