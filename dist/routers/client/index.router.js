"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_router_1 = require("./topics.router");
const songs_router_1 = require("./songs.router");
const favorite_songs_router_1 = require("./favorite-songs.router");
const search_router_1 = require("./search.router");
const clientRouter = (app) => {
    app.use('/topics', topics_router_1.routerTopics);
    app.use('/songs', songs_router_1.routerSongs);
    app.use('/favorite-songs', favorite_songs_router_1.routerFavorite);
    app.use('/search', search_router_1.routerSearch);
};
exports.default = clientRouter;
