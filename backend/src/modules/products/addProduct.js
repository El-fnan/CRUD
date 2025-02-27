import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.post("/products", (req, res) => {
    const { name, price, description } = req.body;
    const query = "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";

    db.query(query, [name, price, description], (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        res.status(201).json({ message: "Product added successfully", product: data });
    })
});

export default router;