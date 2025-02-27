import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.get("/products/search", (req, res) => {
    const searchTerm = `%${req.query.name}%`;
    const query = "SELECT * FROM products WHERE name LIKE ?";

    db.query(query, [searchTerm], (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        res.status(200).json(data);
    });
});

export default router;