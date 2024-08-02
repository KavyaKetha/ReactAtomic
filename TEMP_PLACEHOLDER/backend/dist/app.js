"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const middlewares_1 = require("./src/middlewares");
const database_config_1 = require("./config/database.config");
const candidate_routes_1 = __importDefault(require("./src/routes/candidate.routes"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const book_routes_1 = __importDefault(require("./src/routes/book.routes"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
(0, database_config_1.dbConnection)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/book', middlewares_1.verifyToken, book_routes_1.default);
app.use('/candidates', middlewares_1.verifyToken, candidate_routes_1.default);
app.use('/', user_routes_1.default);
app.use('/logout', middlewares_1.logout);
app.use(middlewares_1.errorMiddleware);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('*', function (req, res) {
    res.status(404).json({ message: 'API Not found' });
});
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
