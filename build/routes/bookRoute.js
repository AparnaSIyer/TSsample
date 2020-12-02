"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const BookController_1 = __importDefault(require("../controllers/BookController"));
class BookRoutes {
    constructor() {
        this.book_controller = new BookController_1.default();
    }
    route(app) {
        app.get('/user/', (req, res) => {
            this.book_controller.createBook(req, res);
        });
    }
    ;
}
exports.BookRoutes = BookRoutes;
//# sourceMappingURL=bookRoute.js.map