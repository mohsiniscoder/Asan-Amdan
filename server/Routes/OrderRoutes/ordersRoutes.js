import express from "express"
import { addOrderController, getAllOrdersController, getClientOrdersController, getNonTechOrdersController, getServiceProviderOrdersController, getTechOrdersController, updateClientOrderStatus, updateServiceProviderOrderStatus } from "../../Controllers/OrdersControllers/ordersControllers.js";
import { authenticateServiceProvider, checkUser } from "../../Middlewares/authMiddlewares.js";
const router=express.Router();


router.get("/getAllOrders",getAllOrdersController);
router.get("/getTechOrders",getTechOrdersController)
router.get("/getNonTechOrders",getNonTechOrdersController);
router.get("/getClientOrders/:id",checkUser,getClientOrdersController);
router.get("/getServiceProviderOrders/:id",authenticateServiceProvider,getServiceProviderOrdersController);
router.post("/addOrder",checkUser,addOrderController);
// router.put("/updateOrderStatus/:id", updateOrderStatusController);
router.put("/updateClientOrderStatus/:id",checkUser,updateClientOrderStatus)
router.put("/updateServiceProviderOrderStatus/:id",authenticateServiceProvider,updateServiceProviderOrderStatus); 
export default router;