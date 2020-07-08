import { DriveFilesAbstractRequest } from "./drive-files-abstract-request";

export class DriveFilesListRequest extends DriveFilesAbstractRequest {

    constructor(query, callback, errorCallback) {
        super(callback, errorCallback);
        this._query = query;
    }

    getUrl() {
        return "https://www.googleapis.com/drive/v3/files";
    }

    getParameters() {
        var parameters = new Map();
        
        // set the default parameters
        parameters.set("fields", "files(id,name,mimeType,properties,parents)");

        // set the query
        if (this._query != null) {
            parameters.set("q", this._query.query);
        }
        
        return parameters;
    }

}