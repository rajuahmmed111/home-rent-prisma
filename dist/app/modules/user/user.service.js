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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide password');
    }
    const hashedPassword = yield bcrypt_1.default.hash(data.password, Number(config_1.default.bycrypt_salt_rounds));
    data.password = hashedPassword;
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
const userLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.email || !data.password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide email and password');
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user || !user.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(data.password, user.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    }
    return user;
});
const githubLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id } = data, userData = __rest(data, ["id"]);
    if (!userData.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide email');
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (user) {
        return user;
    }
    const response = yield prisma_1.default.user.create({
        data: userData,
    });
    return response;
});
const googleLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id } = data, userData = __rest(data, ["id"]);
    if (!userData.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide email');
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (user) {
        return user;
    }
    const response = yield prisma_1.default.user.create({
        data: userData,
    });
    return response;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    return user;
});
exports.UserService = {
    userRegister,
    userLogin,
    getUserByEmail,
    githubLogin,
    googleLogin
};
