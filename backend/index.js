import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import addProduct from "./src/modules/products/addProduct.js";
import getAllProducts from "./src/modules/products/getAllProducts.js";
import getProduct from "./src/modules/products/getProduct.js";
import updateProduct from "./src/modules/products/updateProduct.js";
import deleteProduct from "./src/modules/products/deleteProduct.js";
import searchProduct from "./src/modules/products/searchProduct.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(searchProduct);
app.use(addProduct);
app.use(getAllProducts);
app.use(getProduct);
app.use(updateProduct);
app.use(deleteProduct);


app.listen(port, ()=>console.log(`Server Is Running at Port: ${port}`));