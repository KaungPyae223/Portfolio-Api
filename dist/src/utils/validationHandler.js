"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = void 0;
const validationError = (errors) => {
    if (errors.length) {
        const error = new Error(errors[0].msg);
        error.status = 400;
        error.err_code = "VALIDATION_FAILED";
        throw error;
    }
};
exports.validationError = validationError;
//# sourceMappingURL=validationHandler.js.map