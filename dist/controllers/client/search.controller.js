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
exports.result = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const convertStringToSlug_1 = require("../../helpers/convertStringToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyWord = `${req.query.keyword}`;
    if (keyWord) {
        const slugUnidecode = (0, convertStringToSlug_1.convertStringToSlug)(keyWord);
        const keyWordRegex = new RegExp(keyWord, "i");
        const slugRegex = new RegExp(slugUnidecode, "i");
        const songs = yield songs_model_1.default.find({
            $or: [
                { title: keyWordRegex },
                { slug: slugRegex }
            ]
        }).select("-lyrics");
        let newSongs = [];
        for (const item of songs) {
            const singer = yield singers_model_1.default.findOne({
                _id: item.singerId
            });
            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                inforSinger: {
                    fullName: singer.fullName,
                    avatar: singer.avatar
                }
            });
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `Kết quả: ${keyWord}`,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "Thành công",
                    songs: newSongs
                });
                break;
            default:
                break;
        }
    }
});
exports.result = result;
