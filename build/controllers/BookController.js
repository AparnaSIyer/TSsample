"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookService_1 = __importDefault(require("../services/BookService"));
class BookController {
    constructor() {
        this.book_service = new BookService_1.default();
    }
    createBook(req, res) {
        this.book_service.createBook(req, (err) => {
            if (err) {
                console.log('error');
            }
            else {
                console.log('create user successfull', res);
            }
        });
    }
}
exports.default = BookController;
//# sourceMappingURL=BookController.js.map