"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = void 0;
const errorCode_1 = require("../config/errorCode");
const validationError = (errors) => {
    if (errors.length) {
        const error = new Error(errors[0].msg);
        error.status = 400;
        error.err_code = errorCode_1.errorCode.validationFailed;
        throw error;
    }
};
exports.validationError = validationError;
//# sourceMappingURL=validationHandler.js.map