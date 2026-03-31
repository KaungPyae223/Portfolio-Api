"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (message, status, errorCode) => {
    const error = new Error(message);
    error.status = status;
    error.err_code = errorCode;
    return error;
};
exports.createError = createError;
//# sourceMappingURL=error.js.map