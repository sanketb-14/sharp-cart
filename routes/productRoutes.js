import { Router } from "express";
import { getAllProducts , getProduct , deleteProduct , editProduct, addProduct } from "../controllers/productController.js";

const router = Router();

router.route("/products").get(getAllProducts).post(addProduct);
router.route("/product/:id").get(getProduct).delete(deleteProduct).patch(editProduct)


export default router;
