"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import path from "path";
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URL || "")
        .then(() => {
        console.log("connected to mongodb database");
    })
        .catch((err) => {
        throw err;
    });
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
/** api routes */
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use("/api/tweets", tweet_1.default);
// /** production */
// app.use(express.static(path.join(__dirname, "../../client/build")));
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });
app.listen(process.env.PORT || 8000, () => {
    connect();
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});
