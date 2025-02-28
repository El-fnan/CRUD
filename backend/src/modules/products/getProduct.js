import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.get("/products/:id", (req, res) => {
    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        if (data.length === 0) res.status(404).json({ Error: "User Not Found" });
        else res.status(200).json(data[0]);
    });
});

export default router;