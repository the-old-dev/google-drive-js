export class DriveFilesQuery {
    
    constructor() {
        this._query = null;
    }

    andIsFolder() {
        this._andIsEqual("mimeType", "application/vnd.google-apps.folder");
    }

    andIsFile() {
        this._andIsEqual("mimeType", "application/vnd.google-apps.file");
    }

    andHasName(name) {
        this._andIsEqual("name", name);
    }

    addHasParentId(id) {
        this._andIsIn("parents", id);
    }

    get query() {
        if (this._query == null) {
            this._query = "";
        }
        return this._query;
    }

    set query(value) {
        this._query = value;
    }

    _andIsEqual(name, value) {
        this._and();
        this.query = this.query + name + "='" + value +"'";
    }

    _andIsIn(name, value) {
        this._and();
        this.query = this.query + "'" + value +"' in " + name;
    }

    _and() {
        if (this.query.length > 0) {
            this.query = this.query + " and "; 
        }
    }
}