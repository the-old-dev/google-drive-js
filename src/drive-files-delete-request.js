import { DriveFilesAbstractRequest } from "./drive-files-abstract-request";

export class DriveFilesDeleteRequest extends DriveFilesAbstractRequest {

    constructor(fileId, callback, errorCallback) {
        super(callback, errorCallback);
        this.fileId = fileId;
     }

    getRequestMethod() {
        return "Delete";
    }
    
    getUrl() {
        return "https://www.googleapis.com/drive/v3/files" + "/"+ this.fileId;
    }

}