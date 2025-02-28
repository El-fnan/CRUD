import db from "../../../database/DBConnection.js";
import express from "express";

const router = express.Router();

router.put("/products/:id", (req, res) => {
    const { name, price, description} = req.body;
    const query = "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?";

    db.query(query, [name, price, description, req.params.id], (error, data) => {
        if (error) return res.status(500).json({ Error: error.message });
        if (data.affectedRows === 0) res.status(404).json({ message: "User Not Found" });
        else res.status(200).json({ message: "Product updated successfully" });
    });
});

export default router;