"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const form_data_1 = __importDefault(require("form-data"));
function isObject(data) {
    const type = typeof data;
    return type === 'function' || (type === 'object' && !!data);
}
function isFile(value) {
    // TODO check if other ways of telling if it's a file should be supported
    return value && value instanceof stream_1.Readable;
}
function hasFileEntry(data) {
    return Object.values(data).some(isFile);
}
/**
 * Decorate axios instance with this function,
 * so that "data" is checked on every call,
 * and where there is a file, it will use FormData to send it.
 */
function axiosFormData(config) {
    // return if
    // - no body
    // - body isn't an object
    // - body has no file type values
    if (!config.data || !isObject(config.data) || !hasFileEntry(config.data)) {
        return config;
    }
    // build form data from original data
    const formData = new form_data_1.default();
    Object.entries(config.data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    // amend original config
    return {
        ...config,
        headers: {
            ...config.headers,
            ...formData.getHeaders(),
        },
        data: formData,
    };
}
exports.default = axiosFormData;
//# sourceMappingURL=index.js.map