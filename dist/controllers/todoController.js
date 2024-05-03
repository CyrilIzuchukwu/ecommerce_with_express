"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleTodo = exports.getUserTodos = exports.singleTodo = exports.getTodos = exports.updateTodo = exports.createTodo = void 0;
const utils_1 = require("../utils/utils");
const todoModel_1 = __importDefault(require("../model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = req.user;
        const validateUser = utils_1.creatTodoSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const newTodo = yield todoModel_1.default.create(Object.assign(Object.assign({}, req.body), { user: verify._id }));
        return res
            .status(200)
            .json({ message: "Todo created successfully", newTodo });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, completed } = req.body;
        const { id } = req.params;
        const validateUser = utils_1.updateTodoSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const todo = yield todoModel_1.default.findById({ _id: id });
        if (!todo) {
            return res.status(400).json({
                error: "Todo not found",
            });
        }
        const updateRecord = yield todoModel_1.default.findByIdAndUpdate(id, {
            description,
            completed,
        }, {
            new: true,
            runValidators: true,
            context: "query",
        });
        if (!updateRecord) {
            return res.status(404).json({
                msg: "Todo not updated",
            });
        }
        return res.status(200).json({
            message: "Todo updates successfully",
            updateRecord,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTodo = updateTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUserTodos = yield todoModel_1.default.find().populate("user");
        res.status(200).json({
            msg: "Todos successfully fetched",
            getAllUserTodos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTodos = getTodos;
const singleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getsingleTodos = yield todoModel_1.default.findById(id);
        if (!getsingleTodos) {
            return res.status(400).json({
                error: "todo not found",
            });
        }
        res.status(200).json({
            msg: "Todos successfully fetched",
            getsingleTodos
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.singleTodo = singleTodo;
const getUserTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const getAllUserTodos = yield todoModel_1.default.find({ user: userId });
        res.status(200).json({
            msg: "Todos successfully fetched",
            getAllUserTodos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserTodos = getUserTodos;
const deleteSingleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteSingleRecord = yield todoModel_1.default.findByIdAndDelete(id);
        if (!deleteSingleRecord) {
            return res.status(400).json({
                error: "Todo not found",
            });
        }
        res.status(200).json({
            message: "Todo successfully deleted",
            deleteSingleRecord
        });
    }
    catch (error) {
        console.error("Problem deleting todo");
    }
});
exports.deleteSingleTodo = deleteSingleTodo;
