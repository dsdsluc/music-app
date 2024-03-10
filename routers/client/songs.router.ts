import  { Router} from "express"
import * as controllers from "../../controllers/client/songs.controller"

const router: Router = Router()

router.get('/:slugTopic', controllers.list)

router.get('/detail/:slugSong', controllers.detail)

router.patch('/like/:typeLike/:idSong', controllers.like);

router.patch('/favorite/:typeFavorite/:idSong', controllers.favorite);

router.patch('/listen/:idSong', controllers.listen);
  
export const  routerSongs:Router = router