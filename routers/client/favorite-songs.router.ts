import  { Router} from "express"
import * as controllers from "../../controllers/client/favorite-songs.controller"

const router: Router = Router()

router.get('/', controllers.index)

  
export const  routerFavorite:Router = router