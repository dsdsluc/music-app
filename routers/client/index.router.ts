import { Express } from "express"
import { routerTopics } from "./topics.router"
import { routerSongs } from "./songs.router";
import { routerFavorite } from "./favorite-songs.router";
import { routerSearch } from "./search.router";




const clientRouter = ( app: Express )=>{
    app.use('/topics', routerTopics);

    app.use('/songs', routerSongs);

    app.use('/favorite-songs', routerFavorite);

    app.use('/search', routerSearch);
}

export default clientRouter