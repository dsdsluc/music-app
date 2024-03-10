import { Express } from "express"
import { routerDashboard } from "./dashboard.router"
import { systemConfig } from "../../config/config"
import { routerSongs } from "./songs.router"
import { routerUpload } from "./upload.router"




const adminRouter = ( app: Express )=>{

    const prefixAdmin  = systemConfig.prefixAdmin

    app.use(`/${prefixAdmin}/dashboard`,routerDashboard)

    app.use(`/${prefixAdmin}/songs`,routerSongs);

    app.use(`/${prefixAdmin}/upload`,routerUpload);
}

export default adminRouter