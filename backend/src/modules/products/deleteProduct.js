import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.delete("/products/:id", (req, res) => {
    const query = "DELETE FROM products WHERE id = ?";

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        if (data.affectedRows === 0) res.status(404).json({ message: "User Not Found" });
        else res.status(200).json({ message: "Product deleted successfully" });
    });
});

export default router;