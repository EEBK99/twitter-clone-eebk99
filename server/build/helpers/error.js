"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
/**
 * error handler
 * @param status
 * @param message
 */
const handleError = (status, message) => {
    const error = new Error();
    error.name = status;
    error.message = message;
    return error;
};
exports.handleError = handleError;
