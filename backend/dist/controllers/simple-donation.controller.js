"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDonationController = void 0;
const database_1 = require("../config/database");
class SimpleDonationController {
    // Create simple donation from public form
    static async createSimpleDonation(req, res) {
        try {
            const { amount, customAmount, name, email, phone, cause, anonymous, recurring } = req.body;
            // Validate required fields
            if (!name || !email || !cause) {
                return res.status(400).json({ error: 'Name, email, and cause are required' });
            }
            if (!amount && !customAmount) {
                return res.status(400).json({ error: 'Please specify a donation amount' });
            }
            const pool = (0, database_1.getPool)();
            const [result] = await pool.query(`INSERT INTO simple_donations 
         (amount, customAmount, name, email, phone, cause, anonymous, recurring) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
                amount || null,
                customAmount || null,
                name,
                email,
                phone || null,
                cause,
                anonymous ? 1 : 0,
                recurring ? 1 : 0
            ]);
            res.status(201).json({
                message: 'Thank you for your donation!',
                id: result.insertId
            });
        }
        catch (error) {
            console.error('Create simple donation error:', error);
            res.status(500).json({ error: 'Failed to save donation' });
        }
    }
    // Get all simple donations (for admin dashboard)
    static async getAllSimpleDonations(req, res) {
        try {
            const pool = (0, database_1.getPool)();
            const [donations] = await pool.query('SELECT * FROM simple_donations ORDER BY created_at DESC');
            res.json(donations);
        }
        catch (error) {
            console.error('Get simple donations error:', error);
            res.status(500).json({ error: 'Failed to get donations' });
        }
    }
}
exports.SimpleDonationController = SimpleDonationController;
//# sourceMappingURL=simple-donation.controller.js.map