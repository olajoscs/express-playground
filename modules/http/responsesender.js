"use strict";

/**
 * General Response returner object
 */
class ResponseSender {
    constructor() {
        this.contentType = 'application/json';
    }

    /**
     * Set the header default header of the response
     *
     * @param response
     * @param httpCode
     * @returns {*}
     */
    setHeaders(response, httpCode) {
        response.writeHead(httpCode, {'Content-Type': this.contentType});

        return response;
    }

    /**
     * Return the result with 200 OK status code
     *
     * @param response
     * @param result
     */
    ok(response, result) {
        this.setHeaders(response, 200)
            .end(JSON.stringify({
                status: 'ok',
                result: result
            }));
    }

    /**
     * Return a general 404 error
     *
     * @param response
     */
    missing(response) {
        this.setHeaders(response, 404)
            .end(JSON.stringify({
                status: 'error',
                reason: 'missing'
            }));
    }

    /**
     * Return a general 500 error
     *
     * @param response
     */
    internalError(response) {
        this.setHeaders(response, 500)
            .end(JSON.stringify({
                status: 'error',
                reason: 'internal'
            }));
    }

    /**
     * Return a custom error message
     *
     * @param response
     * @param statusCode
     * @param reason
     */
    customError(response, statusCode, reason) {
        this.setHeaders(response, statusCode)
            .end(JSON.stringify({
                status: 'error',
                reason: reason
            }));
    }

    /**
     * Return an invalid input error
     *
     * @param response
     * @param reason
     */
    invalidInput(response, reason) {
        this.setHeaders(response, 400)
            .end(JSON.stringify({
                status: 'error',
                reason: reason
            }));
    }
}

/**
 * General response sender object
 * @type {ResponseSender}
 */
module.exports = new ResponseSender();