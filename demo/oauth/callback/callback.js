import { OAuthContextFactory } from "../index.js";

var logger = document.getElementsByName("logger")[0];

var logSuccess = function(msg) {
    logger.innerText = "Success:=" + msg;
}

var logError = function(msg) {
    logger.innerHTML = "Error occured!<p>code:="+msg.code+"<br>"+msg.description;
}

var context = OAuthContextFactory.createLoginResponseContext("/demo/oauth/oauth2/index.html", logSuccess, logError );

/** === run directly === */
context.startChain.handle(context);