import { html  } from "lit-element";
import { WueTextInput} from "web-ui-elements";
import { BasicPanel } from "./basic-panel";

export class DeletePanel extends BasicPanel {

    constructor() {
        super("Delete", "delete");
    }

    get inputs() {
        return html`
            <wue-text-input name="fileId" title="File-ID" slot="inputs" value="" size="48"></wue-text-input>
        `;
    }

}
customElements.define('delete-panel', DeletePanel);