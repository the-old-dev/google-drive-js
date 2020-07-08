import { DriveFilesAbstractRequest } from "./drive-files-abstract-request";

export class DriveFilesGetRequest extends DriveFilesAbstractRequest {

    constructor(fileId, metadataOnly, callback, errorCallback) {
        super(callback, errorCallback);
        this.fileId = fileId;
        if (metadataOnly == null) {
            metadataOnly = false;
        }
        this.metadataOnly = metadataOnly;
     }

    getRequestMethod() {
        return "GET";
    }
    
    getUrl() {
        return "https://www.googleapis.com/drive/v3/files/"+this.fileId;
    }

    getParameters() {
        var parameters = new Map();
                
        if (this.metadataOnly) {
             // set the metadataOnly parameters
            parameters.set("fields", "id,name,mimeType,properties,parents");
        } else {
            // set the download media parameter
            // @see https://developers.google.com/drive/api/v3/manage-downloads
            parameters.set("alt", "media");
        }

        return parameters;
    }

}