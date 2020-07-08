export class DriveFilesMetadata {

    static MIME_TYPES = {
        FOLDER: "application/vnd.google-apps.folder",
        JSON: "application/json",
        XML: "application/xml"
    };

    constructor(name) {
        this.name = name;
        this._mimeType = DriveFilesMetadata.MIME_TYPES.JSON;
        this.id = null;
        this._parents = [null];
        this.properties = new Map();
    }

    set mimeType(aMimeType) {
        if(this._isSupportedMimeType(aMimeType)) {
            this._mimeType = aMimeType;
        }
    }

    get mimeType() {
        return this._mimeType;
    }

    set parent(parent) {
        this._parents = [parent];
    }

    get parent() {
        return this._parents[0];
    }

    get parents() {
        return this._parents;
    }

    _isSupportedMimeType(mimeType) {
        var isSupported = false;
        var supporteds = Object.values(DriveFilesMetadata.MIME_TYPES);
        supporteds.forEach(function (supported) {
            if (supported == mimeType) {
                isSupported = true;
            }
        });
        return isSupported;
    }
}