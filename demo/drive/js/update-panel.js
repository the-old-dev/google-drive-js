import { html } from "lit-element";
import { WueTextInput } from "web-ui-elements";
import { BasicPanel } from "./basic-panel";

export class UpdatePanel extends BasicPanel {

    constructor() {
        super("Update", "autorenew");
    }

    get inputs() {
        return html`
            <wue-text-input name="fileId" title="File-ID" slot="inputs" value="" size="48"></wue-text-input>
            <wue-text-input name="mimeType" title="Mimetype" slot="inputs" value="" size="48"></wue-text-input>
            <wue-text-input name="content" title="Content" slot="inputs" value="" size="48"></wue-text-input>
        `;
    }

}

customElements.define('update-panel', UpdatePanel);