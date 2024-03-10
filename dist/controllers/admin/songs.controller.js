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
exports.editPost = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/index", {
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singers_model_1.default.find({
        deleted: false
    });
    const topics = yield topics_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/create", {
        pageTitle: "Tạo mới bài hát",
        singers: singers,
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const objectSong = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.TopicId,
        lyrics: "",
        audio: audio,
    };
    const newSong = new songs_model_1.default(objectSong);
    yield newSong.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs/`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const song = yield songs_model_1.default.findOne({
        _id: idSong
    });
    const singers = yield singers_model_1.default.find({
        deleted: false
    });
    const topics = yield topics_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        singers: singers,
        topics: topics
    });
});
exports.edit = edit;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectSong = {
        title: req.body.title,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.TopicId,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        objectSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        objectSong["audio"] = req.body.audio[0];
    }
    yield songs_model_1.default.updateOne({
        _id: req.params.id
    }, objectSong);
    res.redirect(`back`);
});
exports.editPost = editPost;
