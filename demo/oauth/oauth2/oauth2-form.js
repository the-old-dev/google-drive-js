import { html } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { AbstractOAuthForm } from "../js/abstract-oauth-form";
import { OAuthContext } from "../index.js";

export class OAuth2Form extends AbstractOAuthForm {

    constructor() {
        super("verified-user", "Show Authorization");
        this.context = new OAuthContext();
    }

    get inputs() {
        return html`
            <!-- Inputs -->
            <div style="width: 440px;" slot="inputs">You have authorized this WepApplication to access your google drive</div>
        `;
    }

    handleButtonClick(inputs, successDisplay, errorDisplay) {
        var authorization = this.context.authorization;
        if (authorization == "null") {
            errorDisplay(authorization);
        } else {
            successDisplay(authorization);
        }
    }

}

customElements.define("oauth2-form", OAuth2Form);