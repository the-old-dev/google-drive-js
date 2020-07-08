import { DriveFilesAbstractRequest } from "./drive-files-abstract-request";

export class DriveFilesUpdateRequest extends DriveFilesAbstractRequest {

    constructor(fileId, mimeType, content, callback, errorCallback) {
        super(callback, errorCallback);
        this.fileId = fileId;
        this.content = content;
        this.mimeType = mimeType;
     }

    getRequestMethod() {
        return "PATCH";
    }
    
    getUrl() {
        return "https://www.googleapis.com/upload/drive/v3/files/"+this.fileId+"?uploadType=media";
    }

    getBody() {
        return JSON.stringify(this.content);
    }

    setHeaders(context) {
        // Call super for authorization
        super.setHeaders(context);
        // set contentType
        this._xhr.setRequestHeader("Content-Type", this.mimeType);
    }

}