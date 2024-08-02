"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.generateToken = exports.verifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const errorMiddleware_1 = require("./errorMiddleware");
const userDao = __importStar(require("../dao/user.dao"));
const jwtsecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'iamjwtsessiontokensecret';
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }
    try {
        jwt.verify(token, jwtsecret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: 'Invalid bearer token.' });
            }
            else {
                let result = yield userDao.findToken(token);
                if (result) {
                    req.body.user = decoded;
                    req.body.token = token;
                    next();
                }
                else {
                    return res.status(403).json({ message: 'Invalid bearer token' });
                }
            }
        }));
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid bearer token' });
    }
});
exports.verifyToken = verifyToken;
const generateToken = (id, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = jwt.sign({ id: id, email: email, role: role }, jwtsecret);
        yield userDao.updateToken(email, token);
        return token;
    }
    catch (error) {
        throw new errorMiddleware_1.InternalServerException('Error occured while generating token.');
    }
});
exports.generateToken = generateToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.header('Authorization')) === null || _c === void 0 ? void 0 : _c.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token missing.' });
    }
    try {
        jwt.verify(token, jwtsecret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: 'Invalid bearer token.' });
            }
            else {
                let result = yield userDao.findToken(token);
                if (result) {
                    req.body.user = null;
                    req.body.token = null;
                    yield userDao.updateToken(result.email, null);
                    return res.status(200).json({ message: 'Successfully Logged Out.' });
                }
                else {
                    return res.status(403).json({ message: 'Invalid bearer token.' });
                }
            }
        }));
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid bearer token.' });
    }
});
exports.logout = logout;
