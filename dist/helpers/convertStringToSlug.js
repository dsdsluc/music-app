"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToSlug = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const convertStringToSlug = (text) => {
    const textUnidecode = (0, unidecode_1.default)(text.trim());
    const textSlug = textUnidecode.replace(/\s+/g, "-");
    return textSlug;
};
exports.convertStringToSlug = convertStringToSlug;
