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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topics_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });
    const songs = yield songs_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("title avatart like slug singerId id");
    for (const song of songs) {
        const inforSinger = yield singers_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["inforSinger"] = inforSinger;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugSong;
    const song = yield songs_model_1.default.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });
    const singer = yield singers_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName avatar");
    const topic = yield topics_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song.id
    });
    song["isFavorite"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: song.title,
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield songs_model_1.default.findOne({
        _id: idSong
    });
    const newLike = typeLike == "like" ? (song.like + 1) : (song.like - 1);
    yield songs_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        message: "Thành công",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const newRecord = new favorite_song_model_1.default({
                songId: idSong
            });
            yield newRecord.save();
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thành công",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield songs_model_1.default.findOne({
        _id: idSong
    });
    const viewSong = song.view + 1;
    yield songs_model_1.default.updateOne({
        _id: idSong
    }, {
        view: viewSong
    });
    res.json({
        code: 200,
        message: "Thành công",
        viewSong: viewSong
    });
});
exports.listen = listen;
