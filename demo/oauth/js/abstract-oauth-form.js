import { html } from "lit-element";
import { WueBasicForm, WueTextInput, WueCheckbox } from "web-ui-elements";

export class AbstractOAuthForm extends WueBasicForm {

    constructor( icon, title) {
        super(title, icon);
    }

}