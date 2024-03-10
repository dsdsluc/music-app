import  { Router} from "express"
import * as controllers from "../../controllers/admin/dashboard.controller"

const router: Router = Router()

router.get('/', controllers.index)

  
export const  routerDashboard:Router = router