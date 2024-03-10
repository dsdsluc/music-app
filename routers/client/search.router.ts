import  { Router} from "express"
import * as controllers from "../../controllers/client/search.controller"

const router: Router = Router()

router.get('/:type', controllers.result)

export const  routerSearch:Router = router