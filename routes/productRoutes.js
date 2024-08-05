import { Router } from "express";
import { getAllProducts , getProduct , deleteProduct , editProduct, addProduct } from "../controllers/productController.js";
import { createOrder } from "../controllers/orderController.js";

const router = Router();

router.route("/products").get(getAllProducts).post(addProduct);
router.route("/product/:id").get(getProduct).delete(deleteProduct).patch(editProduct)
router.route("/cart/createOrder").post(createOrder)


export default router;
