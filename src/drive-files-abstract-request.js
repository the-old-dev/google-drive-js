import { OAuthError } from "google-oauth-js";

export class DriveFilesAbstractRequest {

    constructor(callback, errorCallback) {
        this._callback = callback;
        this._errorCallback = errorCallback;
        this._xhr = null;
    }

    execute(context) {

        // check if there is a authorization and if not, then exit.
        if (context.authorization == null) {
            context.error = OAuthError.errorIfIsNullOrEmptyString("authorization", context.authorization);
            this._errorCallback(context.error);
            return;
        }

        // Request cycle
        this._xhr = new XMLHttpRequest();
        this._xhr.open(this.getRequestMethod(), this._getUrl(), true);
        this.setHeaders(context);
        this._registerForResponse();
        this._xhr.send(this.getBody());

    }

    // === Typically overwrite the next methods =====

    /**
     * Must be overwriten
     */
    getUrl() {
        return null;
    }

    getParameters() {
        return null;
    }

    getRequestMethod() {
        return "GET";
    }

    getBody() {
        return null;
    }

    /**
     * Sets the authorization header. Only overwrite if necessary
     * 
     * @param {OAuthContext} context 
     */
    setHeaders(context) {
        var authorization = context.authorization;
        this._xhr.setRequestHeader(
            "Authorization",
            authorization["token_type"] + " " + authorization["access_token"]);
    }

    onResponse(request) {

        // The var "this._xhr" is not a valid instance here, take the parameter instead!!!
        var status = request.status;
        var state = request.readyState;

        if (state != 4) {
            return;
        }

        if ( status == 200)  {

            var response = null;

            if(request.responseText != null && request.responseText != "" ) {
                response = JSON.parse(request.responseText);
            }


            var result = {
                code: status,
                response: response
            };
            this._callback(result);
        } else if ( status == 204)  {
            var result = {
                code: status,
                response: {}
            };
            this._callback(result);
        }  else {
            var error = {
                error: status,
                error_description: JSON.parse(request.responseText)
            };
            this._errorCallback(error);
        }

    }

    _registerForResponse() {

        // both variables have to be localiced!
        var xhr = this._xhr;
        var mySelf = this;

        xhr.onreadystatechange = function (e) {
            mySelf.onResponse(xhr);
        };

    }

    _getUrl() {

        var url = this.getUrl();
        var parameters = this.getParameters();

        // check if there are no parameters
        if ((parameters == null) || (parameters.size == 0)) {
            return url;
        }

        // handle parameters
        url = url + "?";
        var key = null;
        var i = 0;
        for (var [key, value] of parameters) {
            if (i > 0) {
                url = url + "&";
            }
            url = url + key + "=" + value;
            i = i + 1;
        }
        return url;
    }

}