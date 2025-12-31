"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationController = void 0;
const database_1 = require("../config/database");
const validation_middleware_1 = require("../middleware/validation.middleware");
class DonationController {
    // Create donation request (NGO only)
    static async createDonation(req, res) {
        try {
            const ngo_id = req.user?.id;
            const { donation_type, title, description, quantity_or_amount, location, pickup_date_time, images, priority } = req.body;
            // Validate donation
            const validationError = (0, validation_middleware_1.validateDonation)({ donation_type, quantity_or_amount, location, pickup_date_time });
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }
            const pool = (0, database_1.getPool)();
            const [result] = await pool.query(`INSERT INTO donations 
         (ngo_id, donation_type, title, description, quantity_or_amount, location, pickup_date_time, images, priority) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ngo_id, donation_type, title, description || null, quantity_or_amount, location, pickup_date_time, images || null, priority || 'normal']);
            res.status(201).json({
                message: 'Donation request created successfully',
                id: result.insertId
            });
        }
        catch (error) {
            console.error('Create donation error:', error);
            res.status(500).json({ error: 'Failed to create donation request' });
        }
    }
    // Get all donations
    static async getAllDonations(req, res) {
        try {
            const { type, location, status, priority } = req.query;
            let query = `
        SELECT d.*, u.name as ngo_name, u.contact_info as ngo_contact 
        FROM donations d
        LEFT JOIN users u ON d.ngo_id = u.id
        WHERE 1=1
      `;
            const params = [];
            if (type) {
                query += ' AND d.donation_type = ?';
                params.push(type);
            }
            if (location) {
                query += ' AND d.location LIKE ?';
                params.push(`%${location}%`);
            }
            if (status) {
                query += ' AND d.status = ?';
                params.push(status);
            }
            if (priority) {
                query += ' AND d.priority = ?';
                params.push(priority);
            }
            query += ' ORDER BY d.created_at DESC';
            const pool = (0, database_1.getPool)();
            const [donations] = await pool.query(query, params);
            res.json(donations);
        }
        catch (error) {
            console.error('Get donations error:', error);
            res.status(500).json({ error: 'Failed to get donations' });
        }
    }
    // Get donation by ID
    static async getDonationById(req, res) {
        try {
            const { id } = req.params;
            const pool = (0, database_1.getPool)();
            const [donations] = await pool.query(`SELECT d.*, u.name as ngo_name, u.email as ngo_email, u.contact_info as ngo_contact, u.address as ngo_address
         FROM donations d
         LEFT JOIN users u ON d.ngo_id = u.id
         WHERE d.id = ?`, [id]);
            if (donations.length === 0) {
                return res.status(404).json({ error: 'Donation not found' });
            }
            res.json(donations[0]);
        }
        catch (error) {
            console.error('Get donation error:', error);
            res.status(500).json({ error: 'Failed to get donation' });
        }
    }
    // Update donation (NGO only)
    static async updateDonation(req, res) {
        try {
            const { id } = req.params;
            const { donation_type, title, description, quantity_or_amount, location, pickup_date_time, status, images, priority } = req.body;
            const pool = (0, database_1.getPool)();
            // Check if donation belongs to this NGO
            const [donations] = await pool.query('SELECT ngo_id FROM donations WHERE id = ?', [id]);
            if (donations.length === 0) {
                return res.status(404).json({ error: 'Donation not found' });
            }
            if (donations[0].ngo_id !== req.user?.id && req.user?.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to update this donation' });
            }
            await pool.query(`UPDATE donations SET 
         donation_type = COALESCE(?, donation_type),
         title = COALESCE(?, title),
         description = COALESCE(?, description),
         quantity_or_amount = COALESCE(?, quantity_or_amount),
         location = COALESCE(?, location),
         pickup_date_time = COALESCE(?, pickup_date_time),
         status = COALESCE(?, status),
         images = COALESCE(?, images),
         priority = COALESCE(?, priority)
         WHERE id = ?`, [donation_type, title, description, quantity_or_amount, location, pickup_date_time, status, images, priority, id]);
            res.json({ message: 'Donation updated successfully' });
        }
        catch (error) {
            console.error('Update donation error:', error);
            res.status(500).json({ error: 'Failed to update donation' });
        }
    }
    // Cancel donation (NGO only)
    static async cancelDonation(req, res) {
        try {
            const { id } = req.params;
            const pool = (0, database_1.getPool)();
            // Check if donation belongs to this NGO
            const [donations] = await pool.query('SELECT ngo_id FROM donations WHERE id = ?', [id]);
            if (donations.length === 0) {
                return res.status(404).json({ error: 'Donation not found' });
            }
            if (donations[0].ngo_id !== req.user?.id && req.user?.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to cancel this donation' });
            }
            await pool.query('UPDATE donations SET status = ? WHERE id = ?', ['cancelled', id]);
            res.json({ message: 'Donation cancelled successfully' });
        }
        catch (error) {
            console.error('Cancel donation error:', error);
            res.status(500).json({ error: 'Failed to cancel donation' });
        }
    }
    // Get donations by NGO
    static async getDonationsByNgo(req, res) {
        try {
            const ngo_id = req.user?.id;
            const pool = (0, database_1.getPool)();
            const [donations] = await pool.query(`SELECT d.*, 
         (SELECT COUNT(*) FROM contributions WHERE donation_id = d.id) as contribution_count
         FROM donations d
         WHERE d.ngo_id = ?
         ORDER BY d.created_at DESC`, [ngo_id]);
            res.json(donations);
        }
        catch (error) {
            console.error('Get NGO donations error:', error);
            res.status(500).json({ error: 'Failed to get donations' });
        }
    }
}
exports.DonationController = DonationController;
//# sourceMappingURL=donation.controller.js.map