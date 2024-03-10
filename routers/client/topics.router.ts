import  { Router} from "express"
import * as controllers from "../../controllers/client/topics.controller"

const router: Router = Router()

router.get('/', controllers.index)
  
export const  routerTopics:Router = router