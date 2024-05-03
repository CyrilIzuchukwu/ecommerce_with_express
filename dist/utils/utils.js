"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.creatProductSchema = exports.option = exports.LoginSchema = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref("password"))
        .required()
        .label("confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    profile_picture: joi_1.default.string(),
    phone_number: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
exports.LoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.option = {
    abortearly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.creatProductSchema = joi_1.default.object({
    item_name: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    price: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    pictures: joi_1.default.array().items(joi_1.default.string()),
});
exports.updateProductSchema = joi_1.default.object({
    item_name: joi_1.default.string().optional(),
    category: joi_1.default.string().optional(),
    price: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    pictures: joi_1.default.array().items(joi_1.default.string()),
});
