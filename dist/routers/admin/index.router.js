"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_router_1 = require("./dashboard.router");
const config_1 = require("../../config/config");
const songs_router_1 = require("./songs.router");
const upload_router_1 = require("./upload.router");
const adminRouter = (app) => {
    const prefixAdmin = config_1.systemConfig.prefixAdmin;
    app.use(`/${prefixAdmin}/dashboard`, dashboard_router_1.routerDashboard);
    app.use(`/${prefixAdmin}/songs`, songs_router_1.routerSongs);
    app.use(`/${prefixAdmin}/upload`, upload_router_1.routerUpload);
};
exports.default = adminRouter;
