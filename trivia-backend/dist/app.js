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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('BACKEND');
});
app.get('/api/trivia/:categoryId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        let url;
        if (categoryId === '0') {
            url = 'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple';
        }
        else {
            url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`;
        }
        const response = yield axios_1.default.get(url);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error!! Couldn't get the trivia questions :(", error);
        res.status(500).json({ error: "Couldn't get the trivia questions :(" });
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
