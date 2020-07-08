import { html, LitElement } from "lit-element";
import { WueTextInput, WueCheckbox } from "web-ui-elements";
import { AbstractOAuthForm } from "../js/abstract-oauth-form";
import { OAuthContextFactory } from "../index.js";

export class LoginForm extends AbstractOAuthForm {

    constructor() {
        super("verified-user", "Log in to Google");
        var scope = "https://www.googleapis.com/auth/drive.file";
        var redirect_url = "http://localhost:8000/demo/oauth/callback/index.html";
        this.context = OAuthContextFactory.createLoginContext(scope, redirect_url, console.log, console.log);
    }

    get inputs() {
        return html`
            <!-- Inputs -->
            <div slot="inputs">Login with your Personal Google Account</div>
        `;
    }

    handleButtonClick(inputs, successDisplay, errorDisplay) {
        this.context.startFlow();
    }

}

customElements.define("login-form", LoginForm);