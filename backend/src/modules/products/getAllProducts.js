import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.get("/products", (req, res) => {
    const query = "SELECT * FROM products";

    db.query(query, (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        res.status(200).json(data);
    });
});

export default router;