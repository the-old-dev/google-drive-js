import { DriveFilesAbstractRequest } from "./drive-files-abstract-request";

export class DriveFilesCreateRequest extends DriveFilesAbstractRequest {

    constructor(metadata, callback, errorCallback) {
        super(callback, errorCallback);
        this.metadata = metadata;
     }

    getRequestMethod() {
        return "POST";
    }
    
    getUrl() {
        return "https://www.googleapis.com/drive/v3/files";
    }

    getBody() {
        return JSON.stringify( {
            mimeType: this.metadata.mimeType,
            name: this.metadata.name,
            parents: this.metadata.parents
        });
    }

    setHeaders(context) {

        // Call super for authorization
        super.setHeaders(context);

        // set contentType
        this._xhr.setRequestHeader("Content-Type", "application/json");

    }

}